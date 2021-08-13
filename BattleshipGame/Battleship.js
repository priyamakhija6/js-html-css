// Add your javascript here
let gameBoard = document.getElementsByClassName("battleship")[0];
let gridSize = 6;
let squareSize = 40;
let notAttemptedSquare = 0;
let shipSquare = 1;
let hit = 2;
let missed = 3;
let missedSquare = 'O';
let hitSquare = 'X';
let maxShipSize = 3;
let gameOver = false;
let gameGrid = [[0,0,0,0,0,0],
    [0,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]];
let hitCounter = 0;
let numTries = 10;

function createGrid(gameBoard) {
    for(let i=0;i<gridSize;i++) {
        for(let j=0;j<gridSize;j++) {
            let square = document.createElement("div");
            square.innerHTML = '.';
            gameBoard.appendChild(square);
            square.id = i.toString()+","+j.toString();
            square.className = 'gridSquare';
            let topPosition = j * squareSize;
            let leftPosition = i * squareSize;

            square.style.top = topPosition + 'px';
            square.style.left = leftPosition + 'px';
        }
    }
}

gameBoard.addEventListener("click",guessPosition,false);

function guessPosition(event) {
    if(event.target !== event.currentTarget && !gameOver) {
        let position = event.target.id.split(",");
        let row = position[0];
        let col = position[1];
        if (gameGrid[row][col] === notAttemptedSquare) {
            event.target.textContent = missedSquare;
            gameGrid[row][col] = missed;
            numTries -=1;
        } else if (gameGrid[row][col] === shipSquare) {
            event.target.textContent = hitSquare;
            gameGrid[row][col] = hit;
            numTries -= 1;
            hitCounter +=1;
            if (maxShipSize === hitCounter) {
                setTimeout(function() {alert ("player 2 won")},1);
                gameOver = true;
            }
        } else {
            setTimeout(function() {alert ("position already attempted")},1);
        }
        if (numTries === 0) {
            setTimeout(function() {alert ("player 1 won")},1);
            gameOver = true;
        }
    }
}
//console.log(gameBoard);
createGrid(gameBoard);
//console.log(gameBoard);
 
