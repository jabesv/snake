console.log("conected!")

//the canvas is conected to a variable and the contex to 'paint in it is declare 2d
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

//function to reset the game
function reloadPage() {
    location.reload();    
}


//class to add new parts to the tail
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//initial speed  
let speed = 7; // times in a second

//stablisment of the area in the canvas
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

//snake 
let headX = 10;
let headY = 10;
const snakeParts = []; //this array will help us to move and increase the body of the snake. will be use will the class SnakePart
let tailLength = 2; //The snake starts with a tail with 2 tiles

// variable apple and initial position
let appleX = 5;     
let appleY = 5;

//declaration of the variable x and y velocity
let xVelocity = 0;
let yVelocity = 0;

//initial score
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
    // this conditional void the program to start in game over
     if ( yVelocity === 0 && xVelocity === 0 ) {
         return false;
     }

    // the next conditions check if the snake hits any wall:
    //wall at the left
    if( headX < 0 ) {
        gameOver = true;
     } 
     //wall at the right
     else if ( headX ===tileCount ) {
        gameOver = true
     }   
     // top wall
     else if (headY < 0 ) {    
         gameOver = true
     } 
     // bottom wall
     else if ( headY === tileCount ) {
         gameOver = true
     }
    
     // this loop checks if the snake hits itself
     for (let i =0; i < snakeParts.length; i++) {
         let part = snakeParts[i];
         if (part.x === headX && part.y === headY) {
             gameOver = true;
             break;
         }
     }


    //'Game over' is displayed
     if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
     }

    return gameOver;
}

//this function that places the score in the canvas
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

    //funtion to draw the snake and keep size of its tail
function drawSnake() {
    
    //tail of the snake
    ctx.fillStyle = 'green';
    for(let i = 0; i< snakeParts.length; i++) {
        let part = snakeParts [i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
        //using the class the snake add new pieces to its tail every time eats an apple
    snakeParts.push(new SnakePart(headX, headY)); // add an item next to the head
    if (snakeParts.length > tailLength){
        snakeParts.shift(); //remove the further item from the snake parts if we have more than tail size
    }
        //this lines keep crontrol of the head of the snake
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

    //funtion to keep control of the snake new positions usin the coordenates
function changeSnakePosition() {
    headX = headX + xVelocity;   //xVelocity can be positive or negative to move left or right
    headY = headY + yVelocity;   //yVelocity can be positive or negative to move the head up or down

    //console.log(headX)
    //console.log(headY)
}


     //draw the apple base using the contex 'ctx' variable to paint the apple
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


//Event listener to activate and move the snake
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

//call function to start game
drawGame();




//===============================================================
// const button = document.querySelector('#reset')
// console.log(button)
// button.addEventListener("click", reset);

// function reset(){
//  drawGame()
//  }

//document.addEventListener('click', reload())
// function reset() {
// }

//const reload = document.getElementById('reset')
//reset.addEventListener('click', reset)
// reset.onclick = drawSnake()

//let button = document.querySelector("#reset")
//button.addEventListener('click', reset());
