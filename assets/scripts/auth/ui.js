'use strict';

const success = (data) => {
  if (data) { console.log(data); }
};

const failure = (error) => {
  console.error(error);
};

const changePasswordSuccess = () => {
  $('#wrongCredChange').text('Password successfully changed!');
  $('.changePasswordForm').val('');
  $('#changePasswordModal').modal('hide');
};

module.exports = {
  failure,
  success,
  changePasswordSuccess
};
