const twoPlayerBtn = document.querySelector(".two-players-btn");
const messageContainer = document.querySelector(".message-container");
const message = document.querySelector(".message");
const resetBtn = document.querySelector(".reset");
const playAgainBtn = document.querySelector(".play-again");
const boardCell = document.querySelectorAll(".cell");
const boardContainer = document.querySelector(".board-container");
const scoreContainer = document.querySelector(".score-container");


// Game Board Object with board setup and win combinations
const gameBoard = {
  board: ['', '', '', '', '', '', '', '', ''],
  winCombinations: ['012', '345', '678', '036', '147', '258', '048', '246'],
}

// Players Object with player setup
const players = {
  player1: {
    name: 'Player 1',
    symbol: 'X',
    score: 0,
  },
  player2: {
    name: 'Player 2',
    symbol: 'O',
    score: 0,
  },
}

// Function to create a new game
function createGame() {
  gameBoard.board = ['', '', '', '', '', '', '', '', '']; // Reset the game board
  boardCell.forEach(cell => cell.textContent = ''); // Clear the board cells
  gameFinish = false; // Reset the game finish status
}


// Function to play the game
function playGame() {
  let currentPlayer = players.player1; // Set the current player to player 1
  let gameFinish = false;
  messageContainer.style.display = "block";
  message.textContent = `${players.player1.name}'s turn`;
  scoreUpdate(); // Refreshes the score

  // For each cell in the board, add an event listener to listen for a click
  boardCell.forEach((cell, index) => { 
    cell.addEventListener("click", () => {
      // If the cell is empty and the game is not finished, set the cell to the current player's symbol
      if (!gameBoard.board[index] && !gameFinish) {
        gameBoard.board[index] = currentPlayer.symbol;
        cell.textContent = currentPlayer.symbol;
        // If the current player wins, increment the score, display the winning message, and show the play again button
        if (checkWin()) {
          currentPlayer.score++;
          scoreUpdate();
          setTimeout(() => {
            message.textContent = `${currentPlayer.name} wins!`;
          }, 0);
          playAgainBtn.style.display = "block";
          gameFinish = true;
          // If every cell is filled and there is no winner, display a draw message and show the play again button
        } else if (gameBoard.board.every(cell => cell !== '')) { // .Every method checks if all elements in the array pass the test
          alert("It's a draw!");
          gameFinish = true;
        } else {
          // Otherwise, switch to the other player
          currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
        }
      if (currentPlayer === players.player1) {
        message.textContent = `${players.player1.name}'s turn`;
      }
      else if (currentPlayer === players.player2) {
        message.textContent = `${players.player2.name}'s turn`;
      }
      }
    });
  });
}

// Function to check if the current player has won
function checkWin() {
  return gameBoard.winCombinations.some(combination => { // .Some method checks if any of the elements in the array pass the test
    const [a, b, c] = combination.split('').map(Number); // Split the combination into an array and convert the elements to numbers
    return gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c]; // Check if the three cells in the combination are the same
  }); // If all true, the current player has a winning combination
}

// Event Listener to display the game board and score container when the two player button is clicked
twoPlayerBtn.addEventListener("click", () => {
  twoPlayerBtn.style.display = "none";
  boardContainer.style.display = "grid";
  scoreContainer.style.display = "flex";
  resetBtn.style.display = "block";
  playGame();
});

// Function to update the score
function scoreUpdate() {
  const player1Score = document.querySelector(".player-one-score");
  const player2Score = document.querySelector(".player-two-score");

  player1Score.textContent = `Player 1 Score: ${players.player1.score}`;
  player2Score.textContent = `Player 2 Score: ${players.player2.score}`; 
}

// Event Listener to Clear everything
resetBtn.addEventListener("click", () => {
  createGame();
  players.player1.score = 0;
  players.player2.score = 0;
  scoreUpdate();
  playGame();
});

// Event Listener to play again
playAgainBtn.addEventListener("click", () => {
  createGame();
  scoreUpdate();
  playGame();
});
