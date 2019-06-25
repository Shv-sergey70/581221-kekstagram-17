'use strict';

(function () {
  // var picturesArray = window.generateUsersPhotoData(); // if we will need in mock-data

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function (picturesArray) {
    var generatePictureDomElement = function (template, pictureData) {
      template.querySelector('.picture__img').src = pictureData.url;
      template.querySelector('.picture__likes').innerText = pictureData.likes;
      template.querySelector('.picture__comments').innerText = pictureData.comments.length;

      return template;
    };

    var getFilledPicturesFragment = function () {
      var picturesFragment = document.createDocumentFragment();

      for (var i = 0; i < picturesArray.length; i++) {
        var template = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
        picturesFragment.appendChild(generatePictureDomElement(template, picturesArray[i]));
      }

      return picturesFragment;
    };

    var picturesBlock = document.querySelector('.pictures');
    picturesBlock.appendChild(getFilledPicturesFragment());
  };

  window.backend.load('//js.dump.academy/kekstagram/data', onSuccess, onError);
})();
