const twoPlayerBtn = document.querySelector(".two-players-btn");
const computerBtn = document.querySelector(".computer-btn");


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

