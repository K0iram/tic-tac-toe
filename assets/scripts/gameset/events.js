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
  gameOver = false;
  event.preventDefault();
  //as soon as i create a new game show the board
  $('.board').show();
  $('.btn-show').show();
  api.createGame(data)
  .then((response) => {
    //take what we get from the sever and put in store
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

const onIndexGame = function (event) {
  event.preventDefault();
  api.indexGames()
    .then((response) => {
      $('.showgames').text("You have played " + response.games.length + " games!!");
    })
    .catch(ui.failure);
};

const OnUpdateGame = function (position, currentTurn, gameOver) {
  event.preventDefault();
  api.updateGame(position, currentTurn, gameOver)
  .then((response) => {
    store.game = response.game;
  })
    .then(ui.success)
    .catch(ui.failure);
};

const checkForUser = function() {
  //if user is already signed in
  if(!!store.user.id){
    $('.btn-sign-in').hide();
    $('.btn-create').show();
  } else {
    $('#sign-out').hide();
  }
};


const addHandlers = () => {
  $('.btn-create').on('click', onCreateGame);
  $('#show-game').on('submit', onShowGame);
  $('.btn-index').on('click', onIndexGame);

  checkForUser();

  $('.field').on('click', function (event) {
    event.preventDefault();
    //if the game is over then the ignore rest fo function body
    if (gameOver) { return false; }

    let position = $(this).attr('data-position');

    if (event.target.innerHTML !== 'X' && event.target.innerHTML !== 'O' && !gameOver) {
      event.target.innerHTML = currentTurn;

      ticTacToe.makeMove(position, currentTurn);

      gameOver = ticTacToe.checkGameOver(currentTurn);

      console.log('CHECK GAME OVER:', ticTacToe.checkGameOver(currentTurn));

      //change player with ternary if currentturn = playerone than player two else player one
      currentTurn = currentTurn === PlayerOne ? PlayerTwo : PlayerOne;
    }

  });


  $('.btn-create').on('click', function clear() {
      $('.field').html('');
      $('.banner').html('');
      $('.winner').html('');
      gameOver = false;
      currentTurn = PlayerOne;

      ticTacToe.clearBoard();
    });
};


module.exports = {
  addHandlers,
};
