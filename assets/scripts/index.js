'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});

$(() => {
  setAPIOrigin(location, config);

  // when form is submitted then console log the input
  $("form").on("submit", function(event){
    event.preventDefault();
    let input = $("#name").val();
    console.log(input);
  });
});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
const ticTacToe = require('./example.js');
let PlayerOne = 'X';
let PlayerTwo = 'O';
let currentTurn = PlayerOne;
let gameOver = false;

$('.field').on('click', function () {
  event.preventDefault();
  let position = $(this).attr('data-position');

  ticTacToe.makeMove(position, currentTurn);
});

// let board = document.querySelector('.board');
$('.board').on('click', function (e) {
  event.preventDefault();
  if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O' && !gameOver) {
    e.target.innerHTML = currentTurn;
    currentTurn = currentTurn === PlayerOne ? PlayerTwo : PlayerOne;
  }

  gameOver = ticTacToe.checkWin();
});

$('.btn-danger').on('click', function clear() {
    $('.field').html('');
    $('.banner').html('');
    gameOver = false;
    currentTurn = PlayerOne;

    ticTacToe.clearBoard();
  });
