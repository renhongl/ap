var Mom = function(){
    this.body = new Image();
    this.eye = new Image();
    this.tail = new Image();
    
    this.tailTimer;
    this.tailCount;
    
    this.eyeTimer;
    this.eyeCount;
    
    this.x;
    this.y;
    this.angle;
}

Mom.prototype.init = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    
    this.tailTimer = 0;
    this.tailCount = 0;
    
    this.eyeTimer = 0;
    this.eyeCount = 0;
    this.eyeInterval = 3000;
    
    this.body.src = "image/bigSwim0.png";
}

Mom.prototype.draw = function(){
    this.x = lerpDistance(mx, this.x, 0.94);
    this.y = lerpDistance(my, this.y, 0.94);
    
    var delY = my - this.y;
    var delX = mx - this.x;
    var beta = Math.atan2(delY,delX);
    this.angle = lerpAngle(beta,this.angle,0.94);
    
    this.tailTimer += delTime;
    if(this.tailTimer > 50){
        this.tailCount = (this.tailCount + 1) % 8;
        this.tailmer = 0;
    }
    
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
    
    ctx2.save();
    ctx2.translate(this.x,this.y);
    ctx2.rotate(this.angle + Math.PI);
    ctx2.drawImage(this.body,-this.body.width * 0.5,-this.body.height * 0.5);
    ctx2.drawImage(momEye[this.eyeCount],-momEye[this.eyeCount].width * 0.5,-momEye[this.eyeCount].height * 0.5);
    ctx2.drawImage(momTail[this.tailCount],-momTail[this.tailCount].width * 0.5 + 30,-momTail[this.tailCount].height * 0.5);
    ctx2.restore();
}
