# clustered-websockets

An implementation of clustered web sockets using [Socket.IO](http://socket.io/) and [express](http://expressjs.com/), based on [this post](http://adamnengland.wordpress.com/2013/01/30/node-js-cluster-with-socket-io-and-express-3/) by [Adam N England](https://github.com/adamnengland). [Redis](http://redis.io/) is used as the Socket.IO store so we can scale to multiple processes.

## Dependencies

[Install Redis](http://redis.io/topics/quickstart). Then run:

```
$ npm install
```

## Start

```
$ node app.js
$ open http://localhost:3000
```

There should be messages logged to the browser dev console and server log indicating the web socket connection has been established.
