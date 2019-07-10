'use strict';

(function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlayButton = document.querySelector('.img-upload__cancel');
  var inputHashTag = document.querySelector('.text__hashtags');
  var submitButton = document.querySelector('.img-upload__submit');

  var HashTagValidity = {
    maxAmountHashTags: 5,
    maxLenghtHashTag: 20,
    errorMessage: 'Хэш-тег начинается с символа \`#\` (решётка) и состоит из одного слова. \nХэш-теги разделяются пробелами. \nОдин и тот же хэш-тег не может быть использован дважды. \nНельзя указать больше пяти хэш-тегов. \nМаксимальная длина одного хэш-тега 20 символов.'
  };

  var isUniqueElement = function (arr) {
    var isUnique = true;
    var array = arr.map(function (elem) {
      return elem.toLowerCase();
    });

    for (var i = 0; i < arr.length; i++) {
      if (array.indexOf(array[i], i + 1) !== -1) {
        isUnique = false;
        break;
      }
    }
    return isUnique;
  };

  var checkHashTag = function () {
    var hashStrings = inputHashTag.value.trim().split(/\s+/);

    if (hashStrings.length === 0) {
      return;
    }

    var isValidTag = false;
    var isValidLenght = false;
    var isValidUniq = isUniqueElement(hashStrings);
    var isValidAmount = hashStrings.length < HashTagValidity.maxAmountHashTags;

    hashStrings.forEach(function (it) {
      isValidTag = /^#[^#]+$/.test(it);
      isValidLenght = it.length <= HashTagValidity.maxLenghtHashTag;
    });

    var isValid = isValidTag && isValidLenght && isValidUniq && isValidAmount;

    if (!isValid) {
      inputHashTag.setCustomValidity(HashTagValidity.errorMessage);
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.save(new FormData(uploadForm));
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
    uploadForm.addEventListener('submit', onFormSubmit);
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
    inputHashTag.setCustomValidity('');
    checkHashTag(inputHashTag.value);
  });
})();
