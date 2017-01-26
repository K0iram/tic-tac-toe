'use strict';
// const activePlayer = players.PLAYER_X;

let gameBoard = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
};

// let emptyGameBoard = Object.assign({}, gameBoard);

const winningRows = [
  [0,1,2],
  [2,5,8],
  [6,7,8],
  [6,4,2],
  [0,4,8],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7]
];
// const players = {
//   PLAYER_X: "Player X",
//   PLAYER_O: "Player O"
// };

let playerHasWon = false;
const checkWin = function (player) {

  for (let i = 0; i < winningRows.length; i++) {
    let positionStore = [];
    for (let y = 0; y < winningRows[i].length; y++) {
      let currentPosition = winningRows[i][y];
      if (gameBoard[currentPosition] === player){
        positionStore.push(player);
      }
      if (positionStore.length > 2) {
        playerHasWon = true;
    }
  }
}
  return playerHasWon;
};

const makeMove = function (position, player){
  if(checkWin() === false){
  gameBoard[position] = player;
  if( checkWin(player) ) {
    $(".banner").text(player + " Wins!!");
  }}
};

const clearBoard = function () {
  gameBoard = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
  };
  playerHasWon = false;
console.log(gameBoard);
 };




module.exports = {
  gameBoard,
  winningRows,
  // players,
  makeMove,
  checkWin,
  clearBoard
};
