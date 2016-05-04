
var canWidth = document.getElementById("can1").width;
var canHeight = document.getElementById("can1").height;
var can1,can2,ctx1,ctx2;
var background,ane,fruit,mom;
var lastTime,delTime;
var mx,my;

function game(){
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
}

function gameLoop(){
    requestAnimFrame(gameLoop);
    var now = Date.now();
    delTime = now - lastTime;
    lastTime = now;
    
    ctx2.clearRect(0,0,canWidth,canHeight);
    
    background.draw();
    
    ane.draw();
    
    fruit.monitor();
    fruit.draw();
    
    mom.draw();
}

function addEvent(e){
    mx = e.layerX;
    my = e.layerY;
}

document.body.onload = game;