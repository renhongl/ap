var Mom = function(){
    this.body = new Image();
    this.eye = new Image();
    this.tail = new Image();
}

Mom.prototype.init = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    this.body.src = "image/bigSwim0.png";
    this.eye.src = "image/bigEye0.png";
    this.tail.src = "image/bigTail0.png";
}

Mom.prototype.draw = function(){
    this.x = lerpDistance(mx, this.x, 0.99);
    this.y = lerpDistance(my, this.y, 0.99);
    
    var delY = my - this.y;
    var delX = mx - this.x;
    var beta = Math.atan2(delY,delX);
    this.angle = lerpAngle(beta,this.angle,0.95);
    
    ctx2.save();
    ctx2.translate(this.x,this.y);
    ctx2.rotate(this.angle + Math.PI);
    ctx2.drawImage(this.body,-this.body.width * 0.5,-this.body.height * 0.5);
    ctx2.drawImage(this.eye,-this.eye.width * 0.5,-this.eye.height * 0.5);
    ctx2.drawImage(this.tail,-this.tail.width * 0.5 + 30,-this.tail.height * 0.5);
    ctx2.restore();
}
