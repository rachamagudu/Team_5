const vsButtons = document.querySelector('.vs-button');
const twoPlayers = document.getElementById('twoPlayers');
const vsComputer = document.getElementById('vsComputer');
const twoPlayersSection = document.querySelector('.two-players');
const vsComputerSection = document.querySelector('.vs-computer');
const restartButton = document.getElementById('restartButton');
const resetgame = document.querySelector('.resetgame');
const twoPlayersWinnerText = document.getElementById('twoPlayersWinnerText');
const vsComputerWinnerText = document.getElementById('vsComputerWinnerText');
const back = document.querySelector('.back');

//storing the score in the variables
let Xscore = 0;
let Oscore = 0;
let playerOneText;
let playerTwoText;
//score containers 
const displayScore = document.querySelector('.scorecontainer');
displayScore.classList.add('space');

//adding the event listener to the two player mood button and calling the twoPlayerGame function.
twoPlayers.addEventListener('click', twoPlayersGame);

function twoPlayersGame() {
    
    document.querySelector('.maincontainer').style.marginTop = '10px';
    document.querySelector('.bt').style.marginBottom = '25px';
    twoPlayersSection.style.display = "";
    vsComputerSection.remove();
    vsButtons.style.display = "none";
    restartButton.style.display = "";
    getAndSetDefaultUser();
    setScoreText('twoplayer');
    resetgame.style.display = "";
    back.remove();
}

//adding the event listener to the vscomputer button and calling the vsComputerGame Button.
vsComputer.addEventListener('click', vsComputerGame);

function vsComputerGame(){
    document.querySelector('.maincontainer').style.marginTop = '10px';
    document.querySelector('.bt').style.marginBottom = '25px';
    vsComputerSection.style.display = "";
    twoPlayersSection.remove();
    vsButtons.style.display = "none";
    restartButton.style.display = "";
   getAndSetDefaultUser();
   setScoreText('vscomputer');
   resetgame.style.display = "";
   back.remove();
}


let currentPlayer = 'X';
let board = [['', '', ''], ['', '', ''], ['', '', '']];
let gameOver = false;

function getAndSetDefaultUser(){
    playerOneText = document.getElementById('player1');
    playerTwoText = document.getElementById('player2');
      //setting the default user to x
      playerOneText.classList.add('currentplayer');
      playerTwoText.classList.remove('currentplayer');
}
function switchPlayer(){
    if(currentPlayer =='X'){
        playerOneText.classList.remove('currentplayer');
        playerTwoText.classList.add('currentplayer');
    }
    else{
        playerTwoText.classList.remove('currentplayer');
        playerOneText.classList.add('currentplayer');
    }
}


let playerOneScore = document.querySelector('.playeronescore');
let playerTwoScore = document.querySelector('.playertwoscore');
function setScoreText(mood){
    
    displayScore.style.display = '';
    if(mood=='vscomputer'){
        playerOneScore.textContent = 'Your Score:';
        playerTwoScore.textContent = 'Computer Score:';
    }
    if(mood =='twoplayer'){
        playerOneScore.textContent = 'Player 1 Score:';
        playerTwoScore.textContent = 'Player 2 Score:';
    }
}
//displaying the total number of wins by user
const playerX =document.getElementById('playeronescore');
const playerO = document.getElementById('player2score');

//total number fo wins of the users
function wins(player){
    
    // console.log(player);
    if(player == 'X'){
        Xscore+=1;
        // console.log(Xscore);
        playerOneScore.textContent=`Player 1 Score: ${Xscore}`;
    }
    else if(player == 'O'){
        Oscore+=1;
        playerTwoScore.textContent = `Player 2 Score: ${Oscore}`;
    }
}

function twoPMakeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        
        board[row][col] = currentPlayer;
        // console.log(board[row][col])
        document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`).textContent = currentPlayer;
        //calling the switch player to change the current user
        switchPlayer();
        if (checkWin()) {
            twoPlayersWinnerText.textContent = `${currentPlayer} Won.!`;
            gameOver = true;
            displayScore.classList.remove('space');
            document.querySelector('.bt').style.marginBottom = '0px';
            wins(currentPlayer);
            
        } else if (checkTie()) {
            twoPlayersWinnerText.textContent = "It's a tie!";
            displayScore.classList.remove('space');
            document.querySelector('.bt').style.marginBottom = '0px';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function vsComMakeMove(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(`.row:nth-child(${row + 1}) .cell:nth-child(${col + 1}`).textContent = currentPlayer;
        switchPlayer();
        if (checkWin()) {
            vsComputerWinnerText.textContent = `${currentPlayer} won..!`;
            displayScore.classList.remove('space');
            document.querySelector('.bt').style.marginBottom = '0px';
            gameOver = true;
            wins(currentPlayer);
            
        } else if (checkTie()) {
            vsComputerWinnerText.textContent = "It's a tie!";
            displayScore.classList.remove('space');
            document.querySelector('.bt').style.marginBottom = '0px';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            if (!gameOver && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); 
            }
        }
    }
}


function makeComputerMove() {
    if (!gameOver) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 3);
        } while (board[row][col] !== '');
        
        vsComMakeMove(row, col);
    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) ||
            (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer)
        ) {
            return true;
        }
    }
    
    if (
        (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
        (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)
    ) {
        return true;
    }
    
    return false;
}

function checkTie() {
    for (let row of board) {
        if (row.includes('')) {
            return false;
        }
    }
    return true;
}

function restartGame() {
    clearBord(3,3);
    location.reload();
}
// restartButton.addEventListener('click', restartGame);

function clearBord(row, coulum){
    //clearing the board previous values
    for(i=0; i<row; i++){
        for(j=0;j<coulum;j++){
                board[i][j] = '';
        }
    }
    //Sellecting the all the cells and setting their values to empty
    let elements = document.querySelectorAll(".game-board .row .cell");
    elements.forEach((e)=>{e.textContent=''});
    //setting the current player back to Default value x 
    currentPlayer = 'X';
    //setting the game over to false 
    gameOver = false;
    //setting the player switching to default user player one
    playerOneText.classList.add('currentplayer');
    playerTwoText.classList.remove('currentplayer');
    document.querySelector('.winner-text').innerHTML = '';
    document.querySelector('.bt').style.marginBottom = '25px';


    displayScore.classList.add('space');
}