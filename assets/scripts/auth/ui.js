'use strict';
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

const signUpFailure = (err) => {
	if (err.status === 400) {
		//unauthorized
		$('.signUpMessage').text("Something went wrong. Check your email/password.");
	} else {
		$('.signUpMessage').text("An unknown error occured.");
	}
};

const signUpSuccess = (resp) => {
  $("#sign-up")[0].reset();
  $('#signUp').modal('hide');
  $('.wrongCred').text("Thanks for signing up! Please sign in to play!");
};

const signInSuccess = (resp) => {
	store.user = resp.user;
	//keeps a copy of the user in local storage to keep  session open
	window.localStorage.setItem('user', JSON.stringify(resp.user));
  $("#sign-in")[0].reset();
  $('#signIn').modal('hide');
	$('.btn-create').show();
	$('.btn-index').show();
	$('.banner').show();
	$('.showgames').show();
  $('.alert span').text('You have signed is as ' + resp.user.email);
	$('.alert').slideDown();

	$('.alert').delay(2000).slideUp();


	checkForUser();
	return store.user;
};

const signOutSuccess = () => {
	$('.board').hide();
	$('.btn-create').hide();
	$('.btn-index').hide();
  $('.banner').text('');
	$('.banner').hide();
  $('.showgames').text('');
	$('.showgames').hide();

	store.user = {};
	// remove local storage user copy.
	window.localStorage.removeItem('user');
	checkForUser();
	return store;
};

const signInFailure = (err) => {
	if (err.status === 401) {
		//unauthorized
		$('.wrongCred').text("Wrong username or password! Try again");
	} else {
		$('.wrongCred').text("An unknown error occured.");
	}
};

const passwordChangeFailure = (err) => {
	if (err.status === 400) {
		//unauthorized
		$('.password-message').text("Your existing password is incorect");
	} else {
		$('.password-message').text("An unknown error occured.");
	}
};

const passwordChangeSuccess = () => {
  $("#change-password")[0].reset();
  $('.password-message').text('');
  $('#changePassword').modal('hide');
	$('.alert span').text('You have sucessfully changed your password!');
	$('.alert').slideDown();

	$('.alert').delay(2000).slideUp();
};


module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  passwordChangeFailure,
  passwordChangeSuccess,
  signOutSuccess
};
