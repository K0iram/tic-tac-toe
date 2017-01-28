'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('../store');
const ticTacToe = require('../example.js');
let PlayerOne = 'X';
let PlayerTwo = 'O';
let currentTurn = PlayerOne;
let gameOver = false;


const onCreateGame = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  api.createGame(data)
  .then((response) => {
    store.game = response.game;
  })
    .then(ui.success)
    .catch(ui.failure);
};

const onShowGame = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  api.showGame(data.game.id)
    .then(ui.success)
    .catch(ui.failure);
};

const OnUpdateGame = function (position, currentTurn, gameStatus) {
  event.preventDefault();
  api.updateGame(position, currentTurn, gameStatus)
  .then((response) => {
    store.game = response.game;
  })
    .then(ui.success)
    .catch(ui.failure);
};


const addHandlers = () => {
  $('.btn-create').on('click', onCreateGame);
  $('#show-game').on('submit', onShowGame);

  $('.field').on('click', function () {
    event.preventDefault();
    if (gameOver) { return false };
    let position = $(this).attr('data-position');
    let gameStatus = ticTacToe.checkWin();
    ticTacToe.makeMove(position, currentTurn);
    OnUpdateGame(position, currentTurn, gameStatus);
  });

  // let board = document.querySelector('.board');
  $('.board').on('click', function (e) {
    event.preventDefault();
    if (e.target.innerHTML !== 'X' && e.target.innerHTML !== 'O' && !gameOver) {
      e.target.innerHTML = currentTurn;
      gameOver = ticTacToe.checkWin(currentTurn) || !ticTacToe.checkDraw();
      currentTurn = currentTurn === PlayerOne ? PlayerTwo : PlayerOne;
    }

  });

  $('.btn-danger').on('click', function clear() {
      $('.field').html('');
      $('.banner').html('');
      gameOver = false;
      currentTurn = PlayerOne;

      ticTacToe.clearBoard();
    });

  $("form").on("submit", function(event){
    event.preventDefault();
    let input = $("#name").val();
    console.log(input);
  });
};


module.exports = {
  addHandlers,
};
