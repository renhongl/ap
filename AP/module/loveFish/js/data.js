var Data = function(){
    this.number;
    this.double;
    this.score;
    this.gameOver;
    this.a;
    this.orange = new Image();
    this.blue = new Image();
}

Data.prototype.init = function(){
    this.number = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.a = 0;
    this.orange.src = "image/fruit.png";
    this.blue.src = "image/blue.png";
}

Data.prototype.draw = function(){
    ctx2.fillStyle = "white";
    ctx2.font = "30px Verdana";
    ctx2.textAlign = "center";
    ctx2.shadowBlur = 20;
    ctx2.shadowColor = "white";
    // ctx2.fillText("number " + this.number,canWidth * 0.5,canHeight - 50);
    // ctx2.fillText("doubler " + this.double,canWidth * 0.5,canHeight - 80);
    
    if(this.gameOver){
        this.a += delTime * 0.0001;
        if(this.a > 1){
            this.a = 1;
        }
        ctx2.fillStyle = "rgba(255,255,255,"+ this.a +")";
        ctx2.fillText("GAMEOVER",canWidth * 0.5,canHeight * 0.5);
    }
    
    ctx2.fillText("SCORE: " + this.score,canWidth * 0.5,60);
    ctx2.fillText(this.number,canWidth * 0.5 + 13,canHeight - 40);
    ctx2.drawImage(this.orange,canWidth * 0.5 - 20,canHeight - 40,30,30);
    ctx2.drawImage(this.blue,canWidth * 0.5 + 20,canHeight - 40,30,30);
}

Data.prototype.addScore = function(){
    this.score += this.number * this.double;
    this.number = 0;
    this.double = 1;
}