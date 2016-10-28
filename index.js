var express = require('express')
app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cfg = require('./config.json');
const path = require('path');
var tw = require('node-tweet-stream')(cfg);
var port = process.env.port || 7414;

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.static(path.join(__dirname, 'sheets')));

tw.track('SEAvSKC');
tw.track('ImproveHalloweenIn5Words');
tw.track('HTGAWM');

tw.on('tweet', function(tweet){
  io.emit('tweet', tweet);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
