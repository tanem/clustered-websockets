var cluster = require('cluster'),
  numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log('master pid %d', process.pid);
  for (var i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on('exit', function(worker, code, signal){
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {

  var express = require('express'),
    routes = require('./routes'),
    domain = require('domain'),
    http = require('http'),
    path = require('path'),
    RedisStore = require('socket.io/lib/stores/redis'),
    redis = require('socket.io/node_modules/redis'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(require('./middleware/domain')(cluster, server));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  io.set('store', new RedisStore({
    redisPub : redis.createClient(),
    redisSub: redis.createClient(),
    redisClient: redis.createClient()
  }));

  io.sockets.on('connection', function(socket){
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function(data){
      console.log(data);
    });
  });

  server.listen(app.get('port'), function(){
    console.log('Express server listening on port %d with pid %d', app.get('port'), process.pid);
  });

}