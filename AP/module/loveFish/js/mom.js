var Mom = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    this.tailTimer = 0;
    this.tailCount = 0;
    this.eyeTimer = 0;
    this.eyeCount = 0;
    this.eyeInterval = 3000;
    this.bodyCount = 0;
    this.eatTimer = 0;
    this.endEat = 0;
    this.eatNow = -1;
    this.eatEnd = false;
};

Mom.prototype.init = function(){
    
};

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
    
    this.eatTimer += delTime;
    
    ctx2.save();
    ctx2.translate(this.x,this.y);
    ctx2.rotate(this.angle + Math.PI);
    
    if(data.double === 1){
        if(this.eatTimer < this.endEat){
            ctx2.drawImage(momEatOrange[this.bodyCount],-momEatOrange[this.bodyCount].width * 0.5,-momEatOrange[this.bodyCount].height * 0.5);
        }else{
            ctx2.drawImage(momBodyOrange[this.bodyCount],-momBodyOrange[this.bodyCount].width * 0.5,-momBodyOrange[this.bodyCount].height * 0.5);
            this.eatEnd = true;
        }
        
    } else{
        if(this.eatTimer < this.endEat){
            ctx2.drawImage(momEatBlue[this.bodyCount],-momEatBlue[this.bodyCount].width * 0.5,-momEatBlue[this.bodyCount].height * 0.5);
        }else{
            ctx2.drawImage(momBodyBlue[this.bodyCount],-momBodyBlue[this.bodyCount].width * 0.5,-momBodyBlue[this.bodyCount].height * 0.5);
            this.eatEnd = true;
        }
    }
    
    if(this.eatEnd){
        fruit.dead(this.eatNow);
    }
    
    ctx2.drawImage(momEye[this.eyeCount],-momEye[this.eyeCount].width * 0.5,-momEye[this.eyeCount].height * 0.5);
    ctx2.drawImage(momTail[this.tailCount],-momTail[this.tailCount].width * 0.5 + 30,-momTail[this.tailCount].height * 0.5);
    ctx2.restore();
};

Mom.prototype.eat = function(i){
    this.endEat = 200;
    this.eatNow = i;
};