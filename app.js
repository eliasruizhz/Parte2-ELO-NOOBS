var http = require('http');
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

io.sockets.on('connection', function(socket){
var db = [
{
  "nombre": "cinco",
  "puntaje": 0
},
{
  "nombre": "cuatro",
  "puntaje": 0
},
{
  "nombre": "tres",
  "puntaje": 0
},
{
  "nombre": "dos",
  "puntaje": 0
},
{
  "nombre": "uno",
  "puntaje": 0
}
];

var chicas = new Array(db.length);
for (var i = 0; i < db.length; i++) {
  chicas[i] = db[i].nombre;
};

var t = 0;
var full = 0;
for (var i = chicas.length-1; i > 0; i--) {
    t = t + i;
  };
var com = function(uno,dos) {
  if (full < t) {
    console.log(uno+" VS "+dos);
    full++;
    socket.emit('lista', { uno: uno, dos: dos });
  }else if (full == t) {
    console.log("FIN");
  };
  
}

var tamaño = chicas.length-1;
var i = 0;
while(i < tamaño){
  com(chicas[tamaño],chicas[i]);
  i++;
  if(i == tamaño){
    i = 0;
    --tamaño;
    if (tamaño == 1) {
    com(chicas[tamaño],chicas[i]);
    socket.emit('num', { comb: t });
    socket.emit('puntajes', { puno: db[tamaño].puntaje, pdos: db[i].puntaje });
    };
  };
};


socket.on('elo', function () {
//var ra = 300, rb = 400;
var res = Math.pow((1/1)+10,(ra-rb)/400);
var ros = Math.pow((1/1)+10,(rb-ra)/400);

var Ea = res;
var Eb = ros;

var C = 30;
var ga = 1.0,gb = 0.0;
//S = 1,0 para ganar, 0,5 para empate y 0,0 para la derrota.
var Rna = ra + C * ( ga - Ea);
var Rnb = rb + C * ( gb - Eb );

if (Rna > Rnb) {
console.log("Gano: Rna"+Rna+" Perdio: Rnb"+Rnb);
}else if(Rna > Rnb){
console.log("Gano: Rnb"+Rnb+" Perdio: Rna"+Rnb);
}else if(Rna == Rnb){
console.log("Empate: Rna"+Rna+" Empate: Rnb"+Rnb);
}

});

  socket.on('disconnect', function () {
      console.log('SocketIO: Usuario Desconetado...');
  });

});
server.listen(3000);
console.log("Server.port: 3000");
