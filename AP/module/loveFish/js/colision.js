function momColisionFruit(){
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]){
                var length = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
                if(length < 900){
                    fruit.dead(i);
                    data.number++;
                    mom.bodyCount++;
                    if(mom.bodyCount > 7){
                        mom.bodyCount = 7;
                    }
                    if(fruit.type[i] === "blue"){
                        data.double = 2;
                    }else{
                        data.double = 1;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}

function momColisionBaby(){
    var length = calLength2(mom.x,mom.y,baby.x,baby.y);
    if(length < 900 && data.number > 0 && !data.gameOver){
        baby.bodyCount = 0;
        mom.bodyCount = 0;
        data.addScore();
    }
}