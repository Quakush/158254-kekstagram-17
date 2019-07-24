'use strict';

(function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlayButton = document.querySelector('.img-upload__cancel');
  var inputHashTag = document.querySelector('.text__hashtags');
  var inputLevelEffect = document.querySelector('.effect-level__value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var picture = imgUploadPreview.querySelector('img');
  var container = document.querySelector('main');

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
    var isValidUnique = isUniqueElement(hashStrings);
    var isValidAmount = hashStrings.length < HashTagValidity.maxAmountHashTags;

    for (var i = 0; i < hashStrings.length; i++) {
      isValidTag = /^#[^#]+$/.test(hashStrings[i]);
      isValidLenght = hashStrings[i].length <= HashTagValidity.maxLenghtHashTag;
      if (isValidTag === false || isValidLenght === false) {
        break;
      }
    }

    var isValid = isValidTag && isValidLenght && isValidUnique && isValidAmount;

    if (!isValid) {
      inputHashTag.setCustomValidity(HashTagValidity.errorMessage);
    }
  };

  var openDialogOverlay = function (win) {
    var dialogWindow = document.querySelector('#' + win).content.querySelector('.' + win);

    container.appendChild(dialogWindow);
  };

  var closeDialogOverlay = function (win) {
    var dialogOverlay = document.querySelector('.' + win);
    var dialogOverlayButton = dialogOverlay.querySelectorAll('.' + win + '__button');

    var onDialogRemove = function () {
      dialogOverlay.remove();
    }

    var onDialogOverlayClose = function (evt) {
      if(!evt.target.closest('.' + win + '__inner')) {
        onDialogRemove();
      }
    };

    var onDialogKeydownEsc = function (evt) {
      window.utils.isKeydownEsc(evt, onDialogRemove);
    };

    dialogOverlay.addEventListener('click', onDialogOverlayClose);
    document.addEventListener('keydown', onDialogKeydownEsc);
    dialogOverlayButton.forEach(function (button) {
      button.addEventListener('click', onDialogRemove);
    });
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    checkHashTag(inputHashTag.value);

    var data = new FormData(uploadForm);
    var onSuccessSaved = function () {

      uploadForm.reset();
      closeUploadOverlay();
      inputLevelEffect.value = '100%';
      picture.className = 'img-upload__preview--none';
      picture.style.filter = '';
      openDialogOverlay('success');
      closeDialogOverlay('success');
    };

    var onErrorMessage = function () {
      closeUploadOverlay();
      openDialogOverlay('error');
      closeDialogOverlay('error')
    };

    window.backend.save(data, onSuccessSaved, onErrorMessage);
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

  inputHashTag.addEventListener('keyup', function () {
    inputHashTag.setCustomValidity('');
    checkHashTag(inputHashTag.value);
  });
})();
