function momColisionFruit(){
    for(var i = 0; i < fruit.num; i++){
        if(fruit.alive[i]){
            var length = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
            if(length < 900){
                fruit.dead(i);
            }
        }
    }
}