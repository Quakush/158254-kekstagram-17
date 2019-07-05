'use strict';

(function () {
  var getRandom = function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
  };

  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var isKeydownEsc = function (evt, cb) {
    if (evt.keyCode === keyCode.ESC) {
      cb();
    }
  };

  var isKeydownEnter = function (evt, cb) {
    if (evt.keyCode === keyCode.ENTER) {
      cb();
    }
  };

  window.utils = {
    getRandom: getRandom,
    isKeydownEsc: isKeydownEsc,
    isKeydownEnter: isKeydownEnter
  };
})();
