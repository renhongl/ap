var Wave = function(){
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive = [];
    this.num = 10;
    this.double = [];
};

Wave.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.r[i] = 0;
        this.alive[i] = false;
        this.double[i] = 1;
    }
};

Wave.prototype.draw = function(){
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            this.r[i] += delTime * 0.03;
            if(this.r[i] > 50){
                this.alive[i] = false;
                this.r[i] = 50;
            }
            var a = 1 - (this.r[i]/50);
            ctx2.save();
            ctx2.beginPath();
            //ctx2.lineWidth = a * 10 + 10;
            ctx2.shadowBlur = 10;
            ctx2.shadowColor = "white";
            ctx2.strokeStyle = "rgba(255,255,255,"+ a +")";
            ctx2.arc(this.x[i],this.y[i],this.r[i] * this.double[i],0,Math.PI * 2);
            ctx2.stroke();
            ctx2.restore();
        }
    }
};

Wave.prototype.born = function(x,y,double){
    for(var i = 0; i < this.num; i++){
        if(!this.alive[i]){
            this.alive[i] = true;
            this.r[i] = 5;
            this.x[i] = x;
            this.y[i] = y;
            this.double[i] = double;
            return;
        }
    }
};