var fs = require('fs');
var mail = require('./mail');
var bodyParser = require('body-parser');
var express, app;

var getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

var getRequest = function () {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(express.static('AP'));
    app.get('/',root);
    app.post('/verifyLogin',verifyLogin);
    
}

function verifyLogin(req,res){
    var email = req.body.email;
    var password = req.body.password;
    fs.readFile('./DB/users.json',function(err,data){
        if(err){
            return console.log(err);
        }else{
            var has = false;
            var users = JSON.parse(data).users;
            users.forEach(function(user,i){
                if(user.email === email && user.password === password){
                    has = true;
                }
            });
            res.send(has);
        }
    });
}

function root(req, res) {
    var ip = getClientIp(req);
    mail.send("NewComer", "Ip:" + ip);
    res.send("Test Server");
}



exports.init = function (serverApp, serverExpress) {
    app = serverApp;
    express = serverExpress;
    getRequest();
}
