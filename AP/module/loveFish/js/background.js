var Background = function(){
  this.width = canWidth;
  this.height = canHeight;
  this.image = new Image();
};

Background.prototype.init = function(){
    this.image.src = "image/background.jpg";
};

Background.prototype.draw = function(){
    ctx1.drawImage(this.image,0,0,canWidth,canHeight);
};