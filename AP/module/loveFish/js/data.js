var Data = function(){
    this.number = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.a = 0;
    this.orange = new Image();
    this.blue = new Image();
    this.bgAudio = document.getElementById("bgm");
    this.eatAudio = document.getElementById("eat");
    this.feedAudio = document.getElementById("feed");
};

Data.prototype.init = function(){
    this.orange.src = "image/fruit.png";
    this.blue.src = "image/blue.png";
    document.getElementById("bgm").src = "audio/bgm.mp3";
    document.getElementById("eat").src = "audio/eat.wav";
    document.getElementById("feed").src = "audio/feed.wav";
    //this.bgAudio.play();
};

Data.prototype.getEventPosition = function(ev){
    var x, y;
    if (ev.layerX || ev.layerX === 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX === 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
};

Data.prototype.draw = function(){
    ctx2.fillStyle = "white";
    ctx2.font = "30px Verdana";
    ctx2.textAlign = "center";
    ctx2.shadowBlur = 20;
    ctx2.shadowColor = "white";
    
    if(this.gameOver){
        this.a += delTime * 0.0001;
        if(this.a > 1){
            this.a = 1;
        }
        ctx2.fillStyle = "rgba(255,255,255,"+ this.a +")";
        ctx2.fillText("GAMEOVER",canWidth * 0.5,canHeight * 0.5 - 50);
        this.bgAudio.pause();
        ctx2.fillText("SCORE: " + this.score,canWidth * 0.5,60);
        ctx2.fillText(this.number,canWidth * 0.5 + 13,canHeight - 40);
        ctx2.drawImage(this.orange,canWidth * 0.5 - 20,canHeight - 40,30,30);
        ctx2.drawImage(this.blue,canWidth * 0.5 + 20,canHeight - 40,30,30);
    }else{
        this.bgAudio.play();
        ctx2.fillText("SCORE: " + this.score,canWidth * 0.5,60);
        ctx2.fillText(this.number,canWidth * 0.5 + 13,canHeight - 40);
        ctx2.drawImage(this.orange,canWidth * 0.5 - 20,canHeight - 40,30,30);
        ctx2.drawImage(this.blue,canWidth * 0.5 + 20,canHeight - 40,30,30);
    }
};

Data.prototype.addScore = function(){
    this.score += this.number * this.double;
    this.number = 0;
    this.double = 1;
};

Data.prototype.playEat = function(){
    if(!this.eatAudio.ended){
        this.eatAudio.currentTime = 0;
    }
    this.eatAudio.play();
};