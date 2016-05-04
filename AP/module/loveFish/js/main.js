
var electron = require("electron");
var ipc = electron.ipcRenderer;

var canWidth = document.getElementById("can1").width;
var canHeight = document.getElementById("can1").height;
var can1,can2,ctx1,ctx2;
var background,ane,fruit,mom,baby;
var lastTime,delTime;
var mx,my;

var momTail = [];
var momEye = [];

var babyEye = [];
var babyBody = [];

function game(){
    addWindowEvent();
    init();
    lastTime = Date.now();
    delTime = 0;
    gameLoop();
}

function init(){
    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    can1 = document.getElementById("can1");
    can2 = document.getElementById("can2");
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    
    can2.addEventListener('mousemove',addEvent);
    
    background = new Background();
    background.init();
    
    ane = new Ane();
    ane.init();
    
    fruit = new Fruit();
    fruit.init();
    
    mom = new Mom();
    mom.init();
    
    baby = new Baby();
    baby.init();
    
    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "image/bigTail" + i + ".png";
    }
    for(var j = 0; j < 2; j++){
        babyEye[j] = new Image();
        babyEye[j].src = "image/babyEye" + j + ".png";
    }
    for(var k = 0; k < 20; k++){
        babyBody[k] = new Image();
        babyBody[k].src = "image/babyFade" + k + ".png";
    }
    for(var l = 0; l < 2; l++){
        momEye[l] = new Image();
        momEye[l].src = "image/bigEye" + l + ".png";
    }
}

function gameLoop(){
    requestAnimFrame(gameLoop);
    var now = Date.now();
    delTime = now - lastTime;
    if(delTime > 40){
        delTime = 40;
    }
    lastTime = now;
    
    ctx2.clearRect(0,0,canWidth,canHeight);
    
    background.draw();
    
    ane.draw();
    
    fruit.monitor();
    fruit.draw();
    
    mom.draw();
    
    momColisionFruit();
    
    baby.draw();
}

function addEvent(e){
    mx = e.layerX;
    my = e.layerY;
}

function addWindowEvent(){
    
    document.getElementById("closeButton").addEventListener('click',function(){
        ipc.send('closeFishWindow');
    });
    document.getElementById("minButton").addEventListener('click',function(){
        ipc.send('minFishWindow');
    });
}

document.body.onload = game;