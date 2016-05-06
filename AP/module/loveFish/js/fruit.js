var Fruit = function(){
    this.x = [];
    this.y = [];
    this.num = 30;
    this.image = new Image();
    this.blue = new Image();
    this.orange = new Image();
    this.width = [];
    this.height = [];
    this.sp = [];
    this.alive = [];
    this.type = [];
    this.aneID = [];
};

Fruit.prototype.init = function(){
    this.orange.src = "image/fruit.png";
    this.blue.src = "image/blue.png";
    for(var i = 0; i < this.num; i++){
        this.x[i] = ane.headX[i];
        this.y[i] = ane.headY[i];
        this.aneID[i] = 0;
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
        if(ran < 0.1){
            this.type[m] = "blue";
        }else{
            this.type[m] = "orange";
        }
    }
};

Fruit.prototype.draw = function(){
    ctx1.save();
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            if(this.width[i] <= 20){
                this.width[i] += 0.01 * delTime;
                this.height[i] += 0.01 * delTime;
                this.x[i] = ane.headX[this.aneID[i]];
                this.y[i] = ane.headY[this.aneID[i]];
            }else{
                this.y[i] -= this.sp[i] * delTime;
                if(this.y[i] < -10){
                    this.alive[i] = false;
                }
            }
            if(this.type[i] === "blue"){
                ctx1.drawImage(this.blue,this.x[i] - this.width[i] * 0.5,this.y[i] - this.height[i] * 0.5,this.width[i],this.height[i]);
            }else{
                ctx1.drawImage(this.orange,this.x[i] - this.width[i] * 0.5,this.y[i] - this.height[i] * 0.5,this.width[i],this.height[i]);
            }
        }
    }
    ctx1.restore();
};

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
                this.aneID[j] = Math.floor(Math.random() * 50);
                if(this.aneID[j] < 5){
                    this.type[j] = "blue";
                }else{
                    this.type[j] = "orange";
                }
                this.x[j] = ane.headX[this.aneID[j]];
                this.y[j] = ane.headY[this.aneID[j]];
                this.width[j] = 0.1;
                this.height[j] = 0.1;
                return;
            }
        }
    }
};

Fruit.prototype.dead = function(i){
    this.alive[i] = false;
};