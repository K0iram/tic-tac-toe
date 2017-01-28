'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('..//store');


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

const OnUpdateGame = function () {
  event.preventDefault();
  api.updateGame()
  .then((response) => {
    store.game = response.game;
  })
    .then(ui.success)
    .catch(ui.failure);
};


const addHandlers = () => {
  $('.btn-create').on('click', onCreateGame);
  $('#show-game').on('submit', onShowGame);
  $('.field').on('click', OnUpdateGame);
};

module.exports = {
  addHandlers,
};
