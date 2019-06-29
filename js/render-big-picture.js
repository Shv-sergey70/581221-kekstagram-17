'use strict';

(function () {
  window.renderBigPicture = function (picturesArray) {
    var bigPictureBlock = document.querySelector('.big-picture');
    var bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
    var bigPictureDescriptionBlock = bigPictureBlock.querySelector('.social__caption');
    var bigPictureLikesCountBlock = bigPictureBlock.querySelector('.likes-count');
    var bigPictureTotalCommentsBlock = bigPictureBlock.querySelector('.comments-count');
    var bigPictureCommentsBlock = bigPictureBlock.querySelector('.social__comments');
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment')
    var bigPictureShowCommentsCountBlock = bigPictureBlock.querySelector('.social__comment-count');
    var bigPictureCommentsLoaderBlock = bigPictureBlock.querySelector('.comments-loader');

    bigPictureImg.src = picturesArray[0]['url'];
    bigPictureDescriptionBlock.textContent = picturesArray[0]['description'];
    bigPictureLikesCountBlock.textContent = picturesArray[0]['likes'];
    bigPictureTotalCommentsBlock.textContent = picturesArray[0]['comments'].length;

    picturesArray[0]['comments'].forEach(function (commentData) {
      var comment = commentTemplate.cloneNode(true);
      var commentImg = comment.querySelector('img');
      var commentTextBlock = comment.querySelector('.social__text');

      commentImg.src = commentData.avatar;
      commentTextBlock.textContent = commentData.message;

      bigPictureCommentsBlock.appendChild(comment);
    });
    bigPictureShowCommentsCountBlock.classList.add('visually-hidden');
    bigPictureCommentsLoaderBlock.classList.add('visually-hidden');
    bigPictureBlock.classList.remove('hidden');
  };
})();
