'use strict';

(function () {

  var picturesBlock = document.querySelector('.pictures');

  var renderOtherUsersPictures = function (picturesArray) {
    picturesBlock.appendChild(getFilledPicturesFragment(picturesArray));
  };

  window.rerenderOtherUsersPictures = function (picturesArray) {
    var otherUsersPictures = picturesBlock.querySelectorAll('.picture');
    otherUsersPictures.forEach(function (value) {
      value.remove();
    });
    renderOtherUsersPictures(picturesArray);
  };

  var generatePictureDomElement = function (template, pictureData) {
    template.querySelector('.picture__img').src = pictureData.url;
    template.querySelector('.picture__likes').innerText = pictureData.likes;
    template.querySelector('.picture__comments').innerText = pictureData.comments.length;

    return template;
  };

  var getFilledPicturesFragment = function (picturesArray) {
    var picturesFragment = document.createDocumentFragment();

    picturesArray.forEach(function (pictureArray) {
      var template = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
      (function (pictureData) {
        template.addEventListener('click', function (clickEvt) {
          clickEvt.preventDefault();
          window.renderBigPicture(pictureData);
        });
      })(pictureArray);
      picturesFragment.appendChild(generatePictureDomElement(template, pictureArray));
    });

    return picturesFragment;
  };

  var onError = function (message) {
    console.error(message);
    renderPage(window.generateUsersPhotoData());
  };

  var onSuccess = function (serverPicturesArray) {
    renderPage(serverPicturesArray);
  };

  var renderPage = function (picturesArray) {
    renderOtherUsersPictures(picturesArray);

    window.activateOtherUsersPicturesFilter(picturesArray);
  };

  window.backend.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
