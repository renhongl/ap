
var electron = require("electron");
var ipc = electron.ipcRenderer;

var canWidth = document.getElementById("can1").width;
var canHeight = document.getElementById("can1").height;
var can1,can2,ctx1,ctx2;
var background,ane,fruit,mom,baby,data,wave;
var lastTime,delTime;
var mx,my;
var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];
var momEatOrange = [];
var momEatBlue = [];
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
    data = new Data();
    data.init();
    wave = new Wave();
    wave.init();
    
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
    for(var m = 0; m < 8; m++){
        momBodyOrange[m] = new Image();
        momBodyOrange[m].src = "image/bigSwim" + m + ".png";
        momBodyBlue[m] = new Image();
        momBodyBlue[m].src = "image/bigSwimBlue" + m + ".png";
        momEatOrange[m] = new　Image();
        momEatOrange[m].src = "image/bigEat" + m + ".png";
        momEatBlue[m] = new Image();
        momEatBlue[m].src = "image/bigEatBlue" + m + ".png";
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
    momColisionBaby();
    data.draw();
    wave.draw();
}

function addEvent(e){
    if(!data.gameOver){
        mx = e.layerX;
        my = e.layerY;
    }
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