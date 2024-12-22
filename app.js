const twoPlayerBtn = document.querySelector(".two-players-btn");
const computerBtn = document.querySelector(".computer-btn");
const resetBtn = document.querySelector(".reset");
const playAgainBtn = document.querySelector(".play-again");
const boardCell = document.querySelectorAll(".cell");
const boardContainer = document.querySelector(".board-container");
const scoreContainer = document.querySelector(".score-container");

const gameBoard = {
  board: ['', '', '', '', '', '', '', '', ''],
  winCombinations: ['012', '345', '678', '036', '147', '258', '048', '246'],
}

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
  computer: {
    name: 'Computer',
    symbol: 'O',
    score: 0,
  }
}

function playGame() {
  let currentPlayer = players.player1;
  let gameFinish = false;

  boardCell.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameBoard.board[index] && !gameFinish) {
        gameBoard.board[index] = currentPlayer.symbol;
        cell.textContent = currentPlayer.symbol;
      }
    });
  });
}




twoPlayerBtn.addEventListener("click", () => {
  twoPlayerBtn.style.display = "none";
  computerBtn.style.display = "none";
  boardContainer.style.display = "grid";
  scoreContainer.style.display = "flex";
  resetBtn.style.display = "block";
  playGame();
});
