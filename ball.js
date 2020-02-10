const ball = {

    x : innerWidth / 2,
    y : innerHeight / 2,
    speed : 7,
    vx : 7,
    vy : 7,
    _color : "white",
    size : 25,
    draw(){

        fill(this._color);
        
        this.x += this.vx;
        this.y += this.vy;

        if(this.y + this.size > window.innerHeight || this.y < 0){
            this.vy *= -1;
        }
        if(this.x > innerWidth || this.x < 0){
            const canvas = document.querySelector("canvas");
            canvas.dispatchEvent(new CustomEvent("score", {detail : canvas[this.x>0?"player1":"player2"]}));
            this.randomColor();
            this.reset();
        }

        return rect(this.x, this.y, this.size, this.size);
    },
    isHitBy(player){

        if(this.vx < 0)
            return (this.x > player.x && this.x < player.x + player.w) && (this.y > player.y && this.y < player.y + player.h);
        if(this.vx > 0)
            return (this.x + this.size > player.x && this.x + this.size < player.x + player.w) && (this.y > player.y && this.y < player.y + player.h);
    },
    bounce(player){
        this.vx *= -1;
        this.vy += (player.y + player.h/2 - this.y) * -0.1;
    },
    reset(){
        this.color = this.randomColor();
        this.vx = 0;
        this.vy = 0;
        this.x = innerWidth / 2;
        this.y = innerHeight / 2;
        setTimeout(_ => {this.vx = (Math.floor(Math.random()*100)%2==0?1:-1) * this.speed; this.vy = this.speed;}, 650);
    },
    randomColor(){
        const max = 255;
        const R = Math.floor(Math.random() * Math.floor(max)), G = Math.floor(Math.random() * Math.floor(max)), B = Math.floor(Math.random() * Math.floor(max));
        this._color = color(R, G, B);
    }
};