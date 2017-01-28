'use strict';

const config = require('../config');
const store = require('../store');

const createGame = function (){
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

const showGame = function (id){
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    }
  });
};

const updateGame = function (position, currentTurn, gameStatus) {
  return $.ajax({
    url: config.apiOrigin + '/games/' + store.game.id,
    method: 'PATCH',
    data: JSON.stringify({
      game: {
        cell: {
          index: position,
          value: currentTurn,
        },
        over: gameStatus

      }
    }),
    contentType: 'application/json',
    headers: {
       Authorization: `Token token=${store.user.token}`,
     }
  });
};

module.exports = {
  createGame,
  showGame,
  updateGame,
};
