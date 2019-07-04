'use strict';

(function () {
  var getRandom = function (minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
  };

  window.utils = {
    getRandom: getRandom
  };
})();
