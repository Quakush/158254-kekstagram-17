'use strict';

(function () {
  var BEGIN_VALUE = 1;
  var PERCENT = 100;
  var PROPORTION_FACTOR = 3;
  var effectsList = document.querySelector('.effects__list');
  var inputLevelEffect = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var levelDepth = document.querySelector('.effect-level__depth');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  window.picture = imgUploadPreview.querySelector('img');

  var changeEffectValue = function (effect, value) {

    if (effect === 'none') {
      window.picture.className = '';
      window.picture.style.filter = 'none';
    }

    if (effect === 'chrome') {
      window.picture.className = 'effects__preview--chrome';
      window.picture.style.filter = 'grayscale(' + (value / PERCENT).toFixed(2) + ')';
    }
    if (effect === 'sepia') {
      window.picture.className = 'effects__preview--sepia';
      window.picture.style.filter = 'sepia(' + (value / PERCENT).toFixed(2) + ')';
    }
    if (effect === 'marvin') {
      window.picture.className = 'effects__preview--marvin';
      window.picture.style.filter = 'invert(' + value + '%)';
    }
    if (effect === 'phobos') {
      window.picture.className = 'effects__preview--phobos';
      window.picture.style.filter = 'blur(' + (value / PERCENT * PROPORTION_FACTOR).toFixed(2) + 'px)';
    }
    if (effect === 'heat') {
      window.picture.className = 'effects__preview--heat';
      window.picture.style.filter = 'brightness(' + (value / PERCENT * PROPORTION_FACTOR + BEGIN_VALUE).toFixed(1) + ')';
    }
  };

  effectsList.addEventListener('change', function (evt) {
    changeEffectValue(evt.target.value, inputLevelEffect.value);
  });

  slider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var effectChosen = effectsList.querySelector(':checked');

    var startCoords = {
      x: evt.clientX
    };

    var SLIDER__RANGE = 100;
    var SLIDER__WIDTH = levelLine.clientWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var sliderPercent = (slider.offsetLeft / SLIDER__WIDTH * SLIDER__RANGE).toFixed(0);

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      inputLevelEffect.value = sliderPercent;
      slider.style.left = (slider.offsetLeft - shift.x) + 'px';
      levelDepth.style.width = sliderPercent + '%';

      if (slider.offsetLeft <= 0) {
        slider.style.left = 0 + 'px';
      }
      if (slider.offsetLeft >= SLIDER__WIDTH) {
        slider.style.left = SLIDER__WIDTH + 'px';
      }
      changeEffectValue(effectChosen.value, inputLevelEffect.value);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
