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
let PlayerOne = 'X';
let PlayerTwo = 'O';
let currentTurn = PlayerOne;

$('.field').on('click', function () {
  event.preventDefault();
  let position = $(this).attr('data-position');

  ticTacToe.makeMove(position, currentTurn);
});

// let board = document.querySelector('.board');
$('.board').on('click', function (e) {
  event.preventDefault();
  if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O') {
    e.target.innerHTML = currentTurn;
    currentTurn = currentTurn === PlayerOne ? PlayerTwo : PlayerOne;
  }

  if (ticTacToe.checkWin() === true) {
    // $('.board').click(function(){return false;});
    currentTurn = '';
  }
});

$('.btn-danger').on('click', function clear() {
    $('.field').html('');
    $('.banner').html('');

    ticTacToe.clearBoard();
  });
