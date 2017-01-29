'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('..//store');

const onSignUp = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  api.signUp(data)
    .then(ui.success)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  $('.btn-create').show();
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      //keeps a copy of the user in local storage to keep  session open
      window.localStorage.setItem('user', JSON.stringify(response.user));
      return store.user;
    })

    .then(ui.success)
    .catch(ui.failure);
};

const onChangePassword = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  api.changePassword(data)
    .then(ui.success)
    .catch(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();
  $('.board').hide();
  $('.btn-create').hide();
  api.signOut()
    .then(() => {
      delete store.user;
      // remove local storage user copy.
      window.localStorage.removeItem('user');
      return store;
    })
    .then(ui.success)
    .catch(ui.failure)
    ;
};


const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
};

module.exports = {
  addHandlers,
};
