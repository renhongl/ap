var express = require('express');
var getRequest = require('./NM/getRequest');
var chat = require('./NM/chat');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(8999);

chat.init(express,app,server);
getRequest.init(app,express);
console.log("Server:localhost:8999 is listening...");


