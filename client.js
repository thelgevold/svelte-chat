var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
require('socket.io')(server);

app.use( '/node_modules', express.static(__dirname + '/node_modules'));
app.use('/dist', express.static(__dirname + '/dist'));  

app.get('/', function(req, res,next) {  
  res.sendFile(__dirname + '/index.html');
});

server.listen(3030);  