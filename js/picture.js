'use strict';

(function () {
  var BEGIN_VALUE = 1;
  var PERCENT = 100;
  var PROPORTION_FACTOR = 3;
  var DEFAUL_LEVEL_EFFECT = 100;
  var DEFAULT_EFFECT = 'none';
  var effectsList = document.querySelector('.effects__list');
  var inputLevelEffect = document.querySelector('.effect-level__value');
  var slider = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var levelDepth = document.querySelector('.effect-level__depth');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectBlock = document.querySelector('.effect-level');
  var picture = imgUploadPreview.querySelector('img');

  var changeEffectValue = function (effect, value) {
    inputLevelEffect.value = DEFAUL_LEVEL_EFFECT;

    if (effect === 'none') {
      picture.className = '';
      picture.style.filter = 'none';
      effectBlock.classList.add('hidden');
    }

    if (effect === 'chrome') {
      picture.className = 'effects__preview--chrome';
      picture.style.filter = 'grayscale(' + (value / PERCENT).toFixed(2) + ')';
    }
    if (effect === 'sepia') {
      picture.className = 'effects__preview--sepia';
      picture.style.filter = 'sepia(' + (value / PERCENT).toFixed(2) + ')';
    }
    if (effect === 'marvin') {
      picture.className = 'effects__preview--marvin';
      picture.style.filter = 'invert(' + value + '%)';
    }
    if (effect === 'phobos') {
      picture.className = 'effects__preview--phobos';
      picture.style.filter = 'blur(' + (value / PERCENT * PROPORTION_FACTOR).toFixed(2) + 'px)';
    }
    if (effect === 'heat') {
      picture.className = 'effects__preview--heat';
      picture.style.filter = 'brightness(' + (value / PERCENT * PROPORTION_FACTOR + BEGIN_VALUE).toFixed(1) + ')';
    }
  };

  changeEffectValue(DEFAULT_EFFECT, DEFAUL_LEVEL_EFFECT);

  effectsList.addEventListener('change', function (evt) {
    effectBlock.classList.remove('hidden');
    slider.style.left = levelLine.clientWidth + 'px';
    levelDepth.style.width = DEFAUL_LEVEL_EFFECT + '%';
    changeEffectValue(evt.target.value, inputLevelEffect.value);
  });

  slider.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var effectChosen = effectsList.querySelector(':checked');

    var startCursorCoords = {
      x: evt.clientX
    };

    var startPinCoords = {
      x: slider.offsetLeft
    };

    var SLIDER__RANGE = 100;
    var SLIDER__WIDTH = levelLine.clientWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var sliderPercent = (slider.offsetLeft / SLIDER__WIDTH * SLIDER__RANGE).toFixed(0);

      var shift = {
        x: startCursorCoords.x - moveEvt.clientX
      };

      inputLevelEffect.value = sliderPercent;
      slider.style.left = (startPinCoords.x - shift.x) + 'px';
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
