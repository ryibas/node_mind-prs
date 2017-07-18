var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('rps_play', function(play){
    console.log('message received - ' + play);
    io.emit('rps_play', play);
    io.emit('chat message', play);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});