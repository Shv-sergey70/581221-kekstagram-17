'use strict';

(function () {
  var selectImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var commentTextarea = document.querySelector('[name="description"]');

  var closeImageEditPopup = function () {
    imageEditPopup.classList.add('hidden');
    selectImageForm.reset();
  };

  var openImageEditPopup = function () {
    imageEditPopup.classList.remove('hidden');
  };

  uploadFileInput.addEventListener('change', function () {
    var closeImageEditPopupButton = imageEditPopup.querySelector('#upload-cancel');

    openImageEditPopup();

    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utility.ESC_KEY && evt.target !== commentTextarea) {
        closeImageEditPopup();
      }
    });
    closeImageEditPopupButton.addEventListener('click', function () {
      closeImageEditPopup();
    });
  });
})();
