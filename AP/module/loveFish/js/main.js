

var canWidth = document.getElementById("can1").width;
var canHeight = document.getElementById("can1").height;
var can1,can2,ctx1,ctx2;
var background,ane;
var lastTime,delTime;

function game(){
    init();
    lastTime = Date.now();
    delTime = 0;
    gameLoop();
}

function init(){
    can1 = document.getElementById("can1");
    can2 = document.getElementById("can2");
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    
    background = new Background();
    background.init();
    
    ane = new Ane();
    ane.init();
}

function gameLoop(){
    requestAnimFrame(gameLoop);
    var now = Date.now();
    delTime = now - lastTime;
    lastTime = now;
    
    background.draw();
    ane.draw();
}

document.body.onload = game;