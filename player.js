class Player{


    constructor({name, x, y, score = 0, color = "white", w, h}){

        this.name = name;
        this.x = x;
        this.y = y;
        this.score = score;
        this.color = color;
        this.w = w;
        this.h = h;
        this.speed = 7;
    }

    draw(){
        fill(this.color);
        return rect(this.x, this.y, this.w, this.h);
    }

    move(dir){
        this.y += this.speed * dir;
    }
}