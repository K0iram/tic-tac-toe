'use strict';

const store = {};

const loggedInUser = JSON.parse(window.localStorage.getItem('user')) || {};
store.user = loggedInUser;

module.exports = store;
