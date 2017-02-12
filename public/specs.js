webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Load all specs so webpack can find them. Think of this as an automatic
	// manifest for bundling specs.

	var req = __webpack_require__(25);
	req.keys().forEach(req);

/***/ },

/***/ 6:
/***/ function(module, exports) {

	'use strict';

	var config = {
	  apiOrigins: {
	    production: 'https://aqueous-atoll-85096.herokuapp.com',
	    development: 'http://tic-tac-toe.wdibos.com'
	  }
	};

	module.exports = config;

/***/ },

/***/ 10:
/***/ function(module, exports) {

	'use strict';

	var store = {};
	//check for existing user and set it otherwise empty
	var loggedInUser = JSON.parse(window.localStorage.getItem('user')) || {};
	store.user = loggedInUser;

	module.exports = store;

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var config = __webpack_require__(6);
	var store = __webpack_require__(10);

	var createGame = function createGame() {
	  return $.ajax({
	    url: config.apiOrigin + '/games',
	    method: 'POST',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var showGame = function showGame(id) {
	  return $.ajax({
	    url: config.apiOrigin + '/games/' + id,
	    method: 'GET',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var indexGames = function indexGames() {
	  return $.ajax({
	    url: config.apiOrigin + '/games/',
	    method: 'GET',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	var updateGame = function updateGame(position, currentTurn, gameOver) {
	  return $.ajax({
	    url: config.apiOrigin + '/games/' + store.game.id,
	    method: 'PATCH',
	    data: JSON.stringify({
	      game: {
	        cell: {
	          index: position,
	          value: currentTurn
	        },
	        over: gameOver
	      }
	    }),
	    contentType: 'application/json',
	    headers: {
	      Authorization: 'Token token=' + store.user.token
	    }
	  });
	};

	module.exports = {
	  createGame: createGame,
	  showGame: showGame,
	  updateGame: updateGame,
	  indexGames: indexGames
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var gameApi = __webpack_require__(13);

	// const activePlayer = players.PLAYER_X;

	var gameBoard = {
	  0: null,
	  1: null,
	  2: null,
	  3: null,
	  4: null,
	  5: null,
	  6: null,
	  7: null,
	  8: null
	};

	var winningRows = [[0, 1, 2], [2, 5, 8], [6, 7, 8], [6, 4, 2], [0, 4, 8], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7]];

	var makeMove = function makeMove(position, player) {
	  gameBoard[position] = player;
	  if (checkWin(player)) {
	    $('.banner').text(player + ' Wins!! Play Again?').show();
	  }
	  if (checkDraw(player)) {
	    $('.banner').text("It's a draw!! Play Again?").show();
	  }

	  gameApi.updateGame(position, player, checkGameOver(player));
	};

	//check each move for win
	var checkWin = function checkWin(player) {
	  var playerHasWon = false;
	  for (var i = 0; i < winningRows.length; i++) {
	    var positionStore = [];
	    for (var y = 0; y < winningRows[i].length; y++) {
	      var currentPosition = winningRows[i][y];
	      if (gameBoard[currentPosition] === player) {
	        positionStore.push(player);
	      }

	      if (positionStore.length > 2) {
	        playerHasWon = true;
	      }
	    }
	  }

	  return playerHasWon;
	};

	//check each move for draw
	var checkDraw = function checkDraw(currentTurn) {
	  var draw = false;

	  // get an array of values from gameboard object
	  var boardValues = Object.values(gameBoard);

	  for (var i = 0; i < boardValues.length; i++) {
	    //iterates thru array to check for any empty space. empty space = no draw possible yet
	    if (!boardValues[i]) {
	      draw = false;
	      break;
	      //if no empty spaces have beeb found at end of array, the its a draw
	    } else if (i >= boardValues.length - 1 && !checkWin(currentTurn)) {
	      draw = true;
	      break;
	    }
	  }

	  return draw;
	};

	var checkGameOver = function checkGameOver(currentTurn) {
	  return checkWin(currentTurn) || checkDraw(currentTurn);
	};

	var clearBoard = function clearBoard() {
	  gameBoard = {
	    0: null,
	    1: null,
	    2: null,
	    3: null,
	    4: null,
	    5: null,
	    6: null,
	    7: null,
	    8: null
	  };

	  // console.log(gameBoard);
	};

	module.exports = {
	  gameBoard: gameBoard,
	  winningRows: winningRows,
	  makeMove: makeMove,
	  checkWin: checkWin,
	  clearBoard: clearBoard,
	  checkDraw: checkDraw,
	  checkGameOver: checkGameOver
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./example.spec.js": 26
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 25;


/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var example = __webpack_require__(15);

	describe('Example', function () {
	  it('is true', function () {
	    expect(example).toBe(true);
	  });
	});

/***/ }

});