Sistema ELO desde NODE.JS
================

Lo primero es crear un servidor:

```js

var http = require('http');
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

```

###Es importante tener 2 eventos indispensables:

```js
io.sockets.on('connection', function(socket){
};
socket.on('disconnect', function () {
});
```

###Junto con su puerto por el cual la aplicación funcionara.

```js
server.listen(3000);
console.log("Server.port: 3000");
```

*  Recuerda ocupar ´~$ npm update´
