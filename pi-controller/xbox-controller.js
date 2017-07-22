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
    socket.on('rps_reset', function () {
      io.emit('rps_view_play');
      console.log('resetting played array.');
    });
  });

  socket.on('rps_play', function (play) {
    console.log('message received - ' + play);

    io.emit('rps_view_play', play);
    io.emit('rps_controller_play', play);
  });

  socket.on('rps_reset', function () {
    io.emit('rps_view_play');
    console.log('resetting played array.');
  })
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});