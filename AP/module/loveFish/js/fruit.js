var Fruit = function(){
    this.x = [];
    this.y = [];
    this.num = 30;
    this.image = new Image();
    this.width = [];
    this.height = [];
    this.sp = [];
    this.alive = [];
    this.type = [];
}

Fruit.prototype.init = function(){
    for(var i = 0; i < this.num; i++){
        this.x[i] = ane.x[i];
        this.y[i] = canHeight - ane.length[i];
    }
    for(var j = 0; j < this.num; j++){
        this.width[j] = 0.1;
        this.height[j] = 0.1;
    }
    for(var k = 0; k < this.num; k++){
        this.sp[k] = Math.random() * 0.05 + 0.01;//[0.01,0.02)
    }
    for(var l = 0; l < this.num; l++){
        this.alive[l] = false;
    }
    for(var m = 0; m < this.num; m++){
        var ran = Math.random();
        if(ran < 0.2){
            this.type[m] = "blue";
        }else{
            this.type[m] = "orange";
        }
    }
}

Fruit.prototype.draw = function(){
    ctx1.save();
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            if(this.width[i] <= 20){
                this.width[i] += 0.01 * delTime;
                this.height[i] += 0.01 * delTime;
            }else{
                this.y[i] -= this.sp[i] * delTime;
                if(this.y[i] < -10){
                    this.alive[i] = false;
                }
            }
            if(this.type[i] === "blue"){
                this.image.src = "image/blue.png";
            }else{
                this.image.src = "image/fruit.png";
            }
            ctx1.drawImage(this.image,this.x[i] - this.width[i] * 0.5,this.y[i] - this.height[i] * 0.5,this.width[i],this.height[i]);
        }
    }
    ctx1.restore();
}

Fruit.prototype.monitor = function(){
    var aliveNum = 0;
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            aliveNum++;
        }
    }
    if(aliveNum < 10){
        for(var j = 0; j < this.num; j++){
            if(!this.alive[j]){
                this.alive[j] = true;
                var aneID = Math.floor(Math.random() * 50);
                if(aneID < 10){
                    this.type[j] = "blue";
                }else{
                    this.type[j] = "orange";
                }
                this.x[j] = ane.x[aneID];
                this.y[j] = canHeight - ane.length[aneID];
                this.width[j] = 0.1;
                this.height[j] = 0.1;
                return;
            }
        }
    }
}