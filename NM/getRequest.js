/**
 * For All modules' api
 */

var fs = require('fs');
var mail = require('./mail');
var bodyParser = require('body-parser');
var express, app;

//Get client IP tool
var getClientIp = function (req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

var getRequest = function () {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(express.static(__dirname.split("NM")[0] + 'AP'));
    
    //For Application Platform
    app.get('/',root);
    app.post('/verifyLogin',verifyLogin);
    
    //For myBlog
    app.post("/myBlog/registerUser",myBlog_registerUser);
    app.post("/myBlog/login",myBlog_login);
}

//--------------------------------API function--------------------------------------------------------------
//0000 mead success, 0001 mean fail.

//myBlog_login: name and password all correct, return 0000
function myBlog_login(req,res){
    var user = req.body;
    var filePath = __dirname.split("NM")[0] + "DB/myBlog/users.json";
    fs.readFile(filePath,function(err,data){
        if(err){
            return console.log(err);
        }else{
            var usersJson = JSON.parse(data.toString());
            var rightLogin = false;
            usersJson.users.forEach(function(u,index){
                if(u.name === user.name && u.password === user.password){
                    rightLogin = true;
                }
            });
            if(rightLogin){
                res.send({"statusCoded": "0000", "message": "Login successed"});//success
            }else{
                res.send({"statusCoded": "0001", "message": "Login failed"});//fail
            }
        }
    });
}

//myBlog_registerUser: Read file first, then 1.Has name, return 0001; 2.No this name, append current user and write in file and return 0000.
function myBlog_registerUser(req,res){
    var user = req.body;
    var filePath = __dirname.split("NM")[0] + "DB/myBlog/users.json";
    fs.readFile(filePath,function(err,data){
        if(err){
            return console.log(err);
        }else{
            var usersJson = JSON.parse(data.toString());
            var nameExist = false;
            usersJson.users.forEach(function(u,index){
                if(u.name === user.name){
                    nameExist = true;
                }
            });
            
            if(nameExist){
                res.send({"statusCoded": "0001", "message": "This name have been registered."});
            }else{
                usersJson.users.push(user);
                fs.writeFile(filePath,JSON.stringify(usersJson),function(err){
                    if(err){
                        return console.log(err);
                    }else{
                        res.send({"statusCoded": "0000", "message": "Register user successed."});
                    }
                });
            }
        }
    });
}

function verifyLogin(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var filePath = __dirname.split("NM")[0] + "DB/users.json";
    fs.readFile(filePath,function(err,data){
        if(err){
            return console.log(err);
        }else{
            var code = 0;
            var name = "";
            var url = "";
            var users = JSON.parse(data).users;
            users.forEach(function(user,i){
                if(user.email === email && user.password === password){
                    code = 1;
                    name = user.name;
                    url = user.url;
                }
            });
            var sendData = {
                name : name,
                code : code,
                url : url
            };
            res.send(sendData);
        }
    });
}

function root(req, res) {
    var ip = getClientIp(req);
    mail.send("NewComer", "Ip:" + ip);
    res.send("Test Server");
}

//------------------------------------------------------------------------------------------------


exports.init = function (serverApp, serverExpress) {
    app = serverApp;
    express = serverExpress;
    getRequest();
};
