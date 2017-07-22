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

  xbox.on('a', function () {
    console.log('[A] button press');
      io.emit('rps_view_reset');
  });

  xbox.on('x', function () {
    console.log('[X] button press');
      io.emit('rps_controller_play', 'rock');
  });

  xbox.on('y', function () {
    console.log('[Y] button press');
      io.emit('rps_controller_play', 'paper');
  });

  xbox.on('b', function () {
    console.log('[B] button press');
      io.emit('rps_controller_play', 'scissors');
  });

});

http.listen(port, function () {
  console.log('listening on *:' + port);
});