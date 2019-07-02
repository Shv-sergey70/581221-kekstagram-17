'use strict';

(function () {
  var selectImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var closeImageEditPopupButton = imageEditPopup.querySelector('#upload-cancel');

  window.closeImageEditPopup = function () {
    imageEditPopup.classList.add('hidden');
    selectImageForm.reset();
    document.removeEventListener('keydown', window.utility.onEscKeydown);
    closeImageEditPopupButton.removeEventListener('click', oncloseImageEditPopupClick);
  };

  var openImageEditPopup = function () {
    imageEditPopup.classList.remove('hidden');
  };

  var oncloseImageEditPopupClick = function () {
    window.closeImageEditPopup();
  };

  uploadFileInput.addEventListener('change', function () {
    openImageEditPopup();

    document.addEventListener('keydown', window.utility.onEscKeydown);
    closeImageEditPopupButton.addEventListener('click', oncloseImageEditPopupClick);
  });
})();
