var Ane = function(){
    this.num = 50;
    this.x = [];
    this.length = [];
}

Ane.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.x[i] = Math.random() * canWidth;//[0,800)
    }
    for(var j = 0; j < this.num; j++){
        this.length[j] = 50 + Math.random() * 50;
    }
}

Ane.prototype.draw = function(){
    ctx1.save();
    for(var i = 0; i < this.num; i++){
        ctx1.beginPath();
        ctx1.strokeStyle = "#FF33CC";
        ctx1.lineWidth = 20;
        ctx1.globalAlpha = 0.7;
        ctx1.lineCap = "round";
        ctx1.moveTo(this.x[i],canHeight);
        ctx1.lineTo(this.x[i],canHeight - this.length[i]);
        ctx1.stroke();
    }
    ctx1.restore();
}