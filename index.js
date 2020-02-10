const WIDTH = window.innerWidth, 
    HEIGHT = window.innerHeight;
let canvas;
const MAX = (_ => {
    let temp;
    do{
        temp = prompt("Max score?");
    }while(isNaN(temp) || temp <= 0);
    return temp;
})();
const PLAYER_HEIGHT = HEIGHT / 4;
const ping = new Player({name : "Ping", x : WIDTH/80, y : getRealMid(PLAYER_HEIGHT), w : WIDTH / 80, h : PLAYER_HEIGHT});
const pong = new Player({name : "Pong", x : WIDTH - WIDTH/80 * 2, y : getRealMid(PLAYER_HEIGHT), w : WIDTH / 80, h : PLAYER_HEIGHT});

function setup(){1
    canvas = document.querySelector("canvas");
    canvas.player1 = ping;
    canvas.player2 = pong;
    canvas.addEventListener("score", e => ++e.detail.score);
}

function draw(){
    //Background setup
    createCanvas(WIDTH, HEIGHT);
    background(0);

    //Movement
    if(pong.y > 0 && keyIsDown(UP_ARROW)){pong.move(-1);}
    else if(pong.y + pong.h < HEIGHT && keyIsDown(DOWN_ARROW)){pong.move(1);}
    if(ping.y > 0 && keyIsDown(87)){ping.move(-1);}
    else if(ping.y + ping.h < HEIGHT && keyIsDown(83)){ping.move(1);}

    ping.draw();
    pong.draw();

    if(ball.isHitBy(ping)){
        ball.bounce(ping);
    }else if(ball.isHitBy(pong)){
        ball.bounce(pong);
    }

    textAlign(CENTER);
    textFont('Helvetica');
    textSize(50);
    text(ping.score, WIDTH/3.2, 100);
    text(pong.score, WIDTH-WIDTH/3.2, 100);
    ball.draw();

    if(canvas.player1.score == MAX || canvas.player2.score == MAX){
        createCanvas(WIDTH, HEIGHT);
        background(0);
        textSize(100);
        text(`${`${canvas.player1.score==MAX?canvas.player1.name:canvas.player2.name}`.toUpperCase()} WINS!`, WIDTH/2, HEIGHT/2);
        //Stops calling draw() continously
        noLoop();
    }
}

function getRealMid(len){return HEIGHT / 2 - len / 2;}