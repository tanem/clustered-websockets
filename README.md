# clustered-websockets

An implementation of clustered web sockets and express 3, based on [this post](http://adamnengland.wordpress.com/2013/01/30/node-js-cluster-with-socket-io-and-express-3/) by [Adam N England](https://github.com/adamnengland). Redis is used as the Socket.IO store so we can scale to multiple processes.

## Dependencies

[Install Redis](http://redis.io/topics/quickstart). Then run:

```sh
$ npm install
```

## Start

```sh
$ node app.js
$ open http://localhost:3000
```

There should be messages logged to the browser dev console and server log indicating the web socket connection has been established.

## License

MIT