var domain = require('domain');

module.exports = function(cluster, server){
  return function(req, res, next){

    var reqDomain = domain.create();

    reqDomain.on('error', function(err){
      console.error('Request domain error', err.stack);
      try {

        // Make sure we close down after 10 seconds...
        var killtimer = setTimeout(function(){
          process.exit(1);
        }, 10 * 1000);

        // ...but don't keep the process open just for that!
        killtimer.unref();

        // Stop taking new requests.
        server.close();

        // Let the master know we're dead. This will trigger a
        // 'disconnect' in the cluster master, and then it will fork
        // a new worker.
        cluster.worker.disconnect();

        // Try to send an error to the request that triggered the problem.
        res.send(500, 'Oops, there was a problem!');
      } catch (err2) {

        // Oh well, not much we can do at this point.
        console.error('Error sending 500!', err2.stack);
      }
    });

    // Because req and res were created before this domain existed,
    // we need to explicitly add them.
    reqDomain.add(req);
    reqDomain.add(res);

    // Now run the handler function in the domain.
    reqDomain.run(next);
    
  };
};