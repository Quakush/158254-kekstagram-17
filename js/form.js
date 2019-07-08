'use strict';

(function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlayButton = document.querySelector('.img-upload__cancel');
  var inputHashTag = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');

  var HashTagValidity = {
    hashTag: '#',
    separator: ' ',
    firstChar: /#/g,
    maxAmountHashTags: 5,
    maxLenghtHashTag: 20,
    errorMessage: 'Хэш-тег начинается с символа \`#\` (решётка) и состоит из одного слова. \nХэш-теги разделяются пробелами. \nОдин и тот же хэш-тег не может быть использован дважды. \nНельзя указать больше пяти хэш-тегов. \nМаксимальная длина одного хэш-тега 20 символов.'
  };

  var trimHashStrings = function (arr) {
    var array = arr.filter(function (it) {
      return it !== '';
    });
    inputHashTag.value = array.join(HashTagValidity.separator);
    return array;
  };

  var checkHashTag = function () {
    var hashArray = inputHashTag.value.split(HashTagValidity.separator);
    var hashStings = trimHashStrings(hashArray);

    if (hashStings.length === 0) {
      return;
    }

    hashStings.forEach(function (it) {
      var hashSybmols = it.match(HashTagValidity.fistChar);
      var isValid = it.charAt(0) === HashTagValidity.hashTag && (hashSybmols && hashSybmols.length === 1) && it.length <= HashTagValidity.maxLenghtHashTag;

      if (!isValid) {
        inputHashTag.setCustomValidity('hh5h56uh45u');
        console.log(HashTagValidity.errorMessage);
      }
    });
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_CODE) {
      if (!(document.activeElement.classList.contains('text__description'))) {
        closeUploadOverlay();
      }
    }
  };

  var showUploadOverlay = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeUploadOverlay = function () {
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFileInput.value = '';
  };

  uploadFileInput.addEventListener('change', function () {
    showUploadOverlay();
  });

  closeOverlayButton.addEventListener('click', function () {
    closeUploadOverlay();
  });

  closeOverlayButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      closeUploadOverlay();
    }
  });

  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    console.log(inputHashTag.value);
    checkHashTag(inputHashTag.value);
  });
})();
