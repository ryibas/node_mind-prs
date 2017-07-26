var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
var xbox = require('xbox-controller-node');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

  xbox.on('a:release', function () {
    console.log('[A] button press');
      io.emit('rps_view_reset');
  });

  xbox.on('x:release', function () {
    console.log('[X] button press');
      io.emit('rps_view_play', 'rock');
  });

  xbox.on('y:release', function () {
    console.log('[Y] button press');
      io.emit('rps_view_play', 'paper');
  });

  xbox.on('b:release', function () {
    console.log('[B] button press');
      io.emit('rps_view_play', 'scissors');
  });

});

http.listen(port, function () {
  console.log('listening on *:' + port);
});