'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const store = require('../store');

const checkForUser = function() {
  //if user is already signed in
  if(!!store.user.id){
    $('.btn-sign-in').hide();
    $('.btn-create').show();
    $('#sign-out').show();
    $('.btn-change-pass').show();
  } else {
    $('#sign-out').hide();
    $('.btn-change-pass').hide();
    $('.btn-sign-in').show();
  }
};

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
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      //keeps a copy of the user in local storage to keep  session open
      window.localStorage.setItem('user', JSON.stringify(response.user));
      $('#signIn').modal('hide');
      $('.btn-create').show();
      $('.btn-index').show();
      $('.banner').show();
      $('.showgames').show();

      checkForUser();
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
  api.signOut()
    .then(() => {

      $('.board').hide();
      $('.btn-create').hide();
      $('.btn-index').hide();
      $('.banner').hide();
      $('.showgames').hide();

      store.user = {};
      // remove local storage user copy.
      window.localStorage.removeItem('user');
      checkForUser();
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
  $('#sign-out').on('click', onSignOut);
};

module.exports = {
  addHandlers,
};
