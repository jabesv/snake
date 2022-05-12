console.log("conected!")

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7; // times in a second

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;


let appleX = 5;
let appleY = 5;


let xVelocity = 0;
let yVelocity = 0;

let score = 0;

// game loop
function drawGame(){
    //console.log('game on') 
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }    
   
    

    clearScreen();
    
    
    checkAppleCollusion();
    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver() {
    let gameOver = false;

    //walls at the left
    if( headX < 0 ) {
        gameOver = true;
    } else if ( headX ===tileCount ) {
        gameOver = true
    } else if (headY < 0 ) { 
        gameOver = true
    } else if ( headY === tileCount ) {
        gameOver = true
    }

    


     if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
     }

    return gameOver;
}

 

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana"
    ctx.fillText("Score  " + score, canvas.width-50, 10);
}
// gets the canvas ready with color and clean.
function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fills the canvas width and height
}

function drawSnake() {
    
    ctx.fillStyle = 'green';
    for(let i = 0; i< snakeParts.length; i++) {
        let part = snakeParts [i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY)); // put an item next to the head
    if (snakeParts.length > tailLength){
        snakeParts.shift(); //remove the further item from the snake parts if we have more than tail size
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}


function changeSnakePosition() {
    headX = headX + xVelocity;   //xVelocity can be positive or negative to move left or right
    headY = headY + yVelocity;   //yVelocity can be positive or negative

    //console.log(headX)
    //console.log(headY)
}


    //draw the apple base 
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect ( appleX * tileCount, appleY * tileCount, tileSize, tileSize);    
}


    // this function detects if the head of the snake is in the same position of the apple
    //if yes, then creates randomly a new apple location and disappears the actual one.
function checkAppleCollusion() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}



document.body.addEventListener('keydown', keyDown);


//control of the snake with arrow keys
function keyDown(event) {
    // arrow up
    if ( event.keyCode == 38 ){
        if (yVelocity == 1)
            return
        yVelocity = -1;
        xVelocity = 0;
    }

    //arrow down
    if (event.keyCode == 40){
        if (yVelocity == -1)
            return
        yVelocity = 1;
        xVelocity = 0;
    }

    // arrow left 
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return
        yVelocity = 0;
        xVelocity = -1;
    }

    //arrow right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return
        yVelocity = 0;
        xVelocity = 1;
    }
}      



drawGame();


