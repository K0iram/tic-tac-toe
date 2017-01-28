'use strict';
const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const authEvents = require('./auth/events.js');
const gamesetEvents = require('./gameset/events.js');

// On document ready
$(() => {
  setAPIOrigin(location, config);
  authEvents.addHandlers();
  gamesetEvents.addHandlers();
});
