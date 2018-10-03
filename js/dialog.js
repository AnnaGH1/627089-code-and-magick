'use strict';
var userDialog = document.querySelector('.setup');
var dialogHandler = document.querySelector('.upload'); // div
// var avatar = document.querySelector('.setup-user-pic'); // img
var avatarUpload = dialogHandler.querySelector('input'); // input

dialogHandler.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoord = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoord.x - moveEvt.clientX,
      y: startCoord.y - moveEvt.clientY
    };

    startCoord = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evtUpload) {
        evtUpload.preventDefault();
        avatarUpload.removeEventListener('click', onClickPreventDefault);
      };
      avatarUpload.addEventListener('click', onClickPreventDefault);
    }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
