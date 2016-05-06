var Ane = function(){
    this.num = 50;
    this.rootX = [];
    this.headX = [];
    this.headY = [];
    this.angle = 0;
    this.amp = [];
};

Ane.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.rootX[i] = Math.random() * canWidth;//[0,800)
        this.headY[i] = canHeight - 150 + Math.random() * 50;
        this.angle[i] = 0;
        this.amp[i] = 30 + Math.random() * 30;
    }
};

Ane.prototype.draw = function(){
    ctx1.save();
    this.angle += delTime * 0.0007;
    var l = Math.sin(this.angle);
    for(var i = 0; i < this.num; i++){
        ctx1.beginPath();
        ctx1.strokeStyle = "#FF33CC";
        ctx1.lineWidth = 20;
        ctx1.globalAlpha = 0.7;
        ctx1.lineCap = "round";
        ctx1.moveTo(this.rootX[i],canHeight);
        this.headX[i] = this.rootX[i] + this.amp[i] * l;
        ctx1.quadraticCurveTo(this.rootX[i],canHeight - 50,this.headX[i],this.headY[i]);
        ctx1.stroke();
    }
    ctx1.restore();
};