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


window.ticTacToe = ticTacToe;
$('.field').on('click', function(){

  let position = $(this).attr('data-position');
  let player = ticTacToe.activePlayer;
    switch (player) {
      case "Player X":
        console.log("Player X Turn");
        break;
      case "Player O":
        console.log("Player O Turn");
        break;
      default:
        console.log("Choose a spot");
    }

  ticTacToe.makeMove(position, player);
});
