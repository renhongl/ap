var mail = require('./NM/mail');
var express = require('express');
var app = express();

var init = function(){
  createServer();
  getRequest();
};

function createServer(){
  app.listen(8999,function(){
    console.log("localhost:8999 listening...");
  });
}

function getRequest(){
  app.use(express.static('public'));

  app.get('/',function(req,res){
    var ip = getClientIp(req);
    mail.send("NewComer","Ip:" + ip);
    res.send("Test Server");
  });
}

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}


init();
