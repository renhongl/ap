var Baby = function(){
    this.x;
    this.y;
    this.angle;
    this.body = new Image();
    this.eye = new Image();
    this.tail = new Image();
    
    this.eyeTimer;
    this.eyeCount;
    this.eyeInterval;
    
    this.bodyTimer;
    this.bodyCount;
}

Baby.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    this.tail.src = "image/babyTail0.png";
    
    this.eyeTimer = 0;
    this.eyeCount = 0;
    this.eyeInterval = 3000;
    
    this.bodyTimer = 0;
    this.bodyCount = 0;
}

Baby.prototype.draw = function(){
    this.x = lerpDistance(mom.x, this.x, 0.99);
    this.y = lerpDistance(mom.y, this.y, 0.99);
    
    var x = mom.x - this.x;
    var y = mom.y - this.y;
    var beta = Math.atan2(y,x);
    this.angle = lerpAngle(beta, this.angle, 0.95);
    
    this.eyeTimer += delTime;
    if(this.eyeTimer > this.eyeInterval){
        this.eyeCount = (this.eyeCount + 1) % 2;
        this.eyeTimer = 0;
        if(this.eyeCount === 0){
            this.eyeInterval = Math.random() * 2000 + 2000;
        }else{
            this.eyeInterval = Math.random() * 200 + 200;
        }
    }
    
    this.bodyTimer += delTime;
    if(this.bodyTimer > 500){
        this.bodyCount = this.bodyCount + 1;
        this.bodyTimer = 0;
        if(this.bodyCount > 19){
            this.bodyCount = 19;
            data.gameOver = true;
        }
    }
    
    ctx2.save();
    ctx2.translate(this.x,this.y);
    ctx2.rotate(this.angle + Math.PI);
    ctx2.drawImage(babyBody[this.bodyCount],-babyBody[this.bodyCount].width * 0.5,-babyBody[this.bodyCount].height * 0.5);
    ctx2.drawImage(babyEye[this.eyeCount],-babyEye[this.eyeCount].width * 0.5,-babyEye[this.eyeCount].height * 0.5);
    ctx2.drawImage(this.tail,-this.tail.width * 0.5 + 24,-this.tail.height * 0.5);
    ctx2.restore();
}