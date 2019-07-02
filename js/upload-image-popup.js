'use strict';

(function () {
  var selectImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var closeImageEditPopupButton = imageEditPopup.querySelector('#upload-cancel');

  window.closeImageEditPopup = function () {
    imageEditPopup.classList.add('hidden');
    selectImageForm.reset();
    document.removeEventListener('keydown', onEscKeydown);
    closeImageEditPopupButton.removeEventListener('click', onCloseImageEditPopupClick);
  };

  var openImageEditPopup = function () {
    imageEditPopup.classList.remove('hidden');
  };

  var onCloseImageEditPopupClick = function () {
    window.closeImageEditPopup();
  };

  var onEscKeydown = function (evtKeydown) {
    if (evtKeydown.key === window.utility.ESC_KEY) {
      var hashtagsInput = document.querySelector('[name="hashtags"]');
      var commentTextarea = document.querySelector('[name="description"]');

      if (evtKeydown.target !== commentTextarea && evtKeydown.target !== hashtagsInput) {
        window.closeImageEditPopup();
      }
    }
  };

  uploadFileInput.addEventListener('change', function () {
    openImageEditPopup();

    document.addEventListener('keydown', onEscKeydown);
    closeImageEditPopupButton.addEventListener('click', onCloseImageEditPopupClick);
  });
})();
