var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var plays = [];

io.on('connection', function (socket) {
  socket.on('rps_play', function (play) {
    console.log('message received - ' + play);

    var playElement = {};
    
    if (play == 'rock') {
      playElement = { r: '1', p: '0', s: '0'};
    } else if (play == 'paper') {
      playElement = { r: '0', p: '1', s: '0'};      
    } else if (play == 'scissors') {
      playElement = { r: '0', p: '0', s: '1'};            
    } else {
      return;
    }

    plays.push(playElement);

    io.emit('rps_view_play', play);
    io.emit('rps_controller_play', play);
  });

  socket.on('rps_reset', function () {
    console.log('resetting played array.');
    plays = [];
  })
});


http.listen(port, function () {
  console.log('listening on *:' + port);
});