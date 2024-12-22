const twoPlayerBtn = document.querySelector(".two-players-btn");
const messageContainer = document.querySelector(".message-container");
const message = document.querySelector(".message");
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
}

function createGame() {
  gameBoard.board = ['', '', '', '', '', '', '', '', ''];
  boardCell.forEach(cell => cell.textContent = '');
  gameFinish = false;
}

function playGame() {
  let currentPlayer = players.player1;
  let gameFinish = false;
  messageContainer.style.display = "block";
  message.textContent = `${players.player1.name}'s turn`;
  scoreUpdate();

  boardCell.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameBoard.board[index] && !gameFinish) {
        gameBoard.board[index] = currentPlayer.symbol;
        cell.textContent = currentPlayer.symbol;
        if (checkWin()) {
          currentPlayer.score++;
          scoreUpdate();
          setTimeout(() => {
            message.textContent = `${currentPlayer.name} wins!`;
          }, 0);
          playAgainBtn.style.display = "block";
          gameFinish = true;
        } else if (gameBoard.board.every(cell => cell !== '')) {
          alert("It's a draw!");
          gameFinish = true;
        } else {
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

function checkWin() {
  return gameBoard.winCombinations.some(combination => {
    const [a, b, c] = combination.split('').map(Number);
    return gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c];
  })
}


twoPlayerBtn.addEventListener("click", () => {
  twoPlayerBtn.style.display = "none";
  boardContainer.style.display = "grid";
  scoreContainer.style.display = "flex";
  resetBtn.style.display = "block";
  playGame();
});

function scoreUpdate() {
  const player1Score = document.querySelector(".player-one-score");
  const player2Score = document.querySelector(".player-two-score");

  player1Score.textContent = `Player 1 Score: ${players.player1.score}`;
  player2Score.textContent = `Player 2 Score: ${players.player2.score}`; 
}

resetBtn.addEventListener("click", () => {
  createGame();
  players.player1.score = 0;
  players.player2.score = 0;
  scoreUpdate();
  playGame();
});

playAgainBtn.addEventListener("click", () => {
  createGame();
  scoreUpdate();
  playGame();
});
