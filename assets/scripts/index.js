'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');

$(() => {
  setAPIOrigin(location, config);
});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
const ticTacToe = require('./example.js');
let PlayerOne = "X";
let PlayerTwo = "O";
let currentTurn = PlayerOne;

window.ticTacToe = ticTacToe;
$('.field').on('click', function(){
  // let player = ticTacToe.players;
  let position = $(this).attr('data-position');

  ticTacToe.makeMove(position, currentTurn);
});

let board = document.querySelector('.board');
board.addEventListener('click', function (e){
  if (e.target.innerHTML !== "X" && "O") {
    e.target.innerHTML = currentTurn;
} currentTurn = currentTurn === PlayerOne ? PlayerTwo : PlayerOne;
});
