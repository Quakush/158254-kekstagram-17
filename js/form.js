'use strict';

(function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;
  var uploadFileInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var closeOverlayButton = document.querySelector('.img-upload__cancel');

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
})();
