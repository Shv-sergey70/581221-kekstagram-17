'use strict';

(function () {
  var selectImageForm = document.querySelector('#upload-select-image');
  var uploadFileInput = document.querySelector('#upload-file');
  var imageEditPopup = document.querySelector('.img-upload__overlay');
  var closeImageEditPopupButton = imageEditPopup.querySelector('#upload-cancel');
  var uploadImg = document.querySelector('.img-upload__preview img');
  var AVAILABLE_IMAGE_FORMATS = ['jpg', 'png', 'jpeg', 'gif'];
  var scale = new window.Scale();

  window.closeImageEditPopup = function () {
    imageEditPopup.classList.add('hidden');
    selectImageForm.reset();
    document.removeEventListener('keydown', onEscKeydown);
    closeImageEditPopupButton.removeEventListener('click', onCloseImageEditPopupClick);
    scale.resetScaleValueAndListeners();
  };

  var openImageEditPopup = function () {
    scale.addScaleButtonsListeners(scale);
    document.addEventListener('keydown', onEscKeydown);
    closeImageEditPopupButton.addEventListener('click', onCloseImageEditPopupClick);

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
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var correctImgFormat = AVAILABLE_IMAGE_FORMATS.some(function (format) {
      return fileName.endsWith(format);
    });

    if (correctImgFormat) {
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function () {
        uploadImg.src = fileReader.result;
        openImageEditPopup();
      });
      fileReader.readAsDataURL(file);
    }
  });
})();
