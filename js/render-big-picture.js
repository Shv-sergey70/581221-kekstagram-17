'use strict';

(function () {
  window.renderBigPicture = function (pictureData) {
    var bigPictureBlock = document.querySelector('.big-picture');
    var bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
    var bigPictureDescriptionBlock = bigPictureBlock.querySelector('.social__caption');
    var bigPictureLikesCountBlock = bigPictureBlock.querySelector('.likes-count');
    var bigPictureTotalCommentsBlock = bigPictureBlock.querySelector('.comments-count');
    var bigPictureCommentsBlock = bigPictureBlock.querySelector('.social__comments');
    var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment')
    var bigPictureShowCommentsCountBlock = bigPictureBlock.querySelector('.social__comment-count');
    var bigPictureCommentsLoaderBlock = bigPictureBlock.querySelector('.comments-loader');

    var clearCommentsBlock = function () {
      bigPictureCommentsBlock.textContent = '';
    };

    bigPictureImg.src = pictureData.url;
    bigPictureDescriptionBlock.textContent = pictureData.description;
    bigPictureLikesCountBlock.textContent = pictureData.likes;
    bigPictureTotalCommentsBlock.textContent = pictureData.comments.length;
    clearCommentsBlock();

    var commentsFragment = document.createDocumentFragment();

    pictureData.comments.forEach(function (commentData) {
      var comment = commentTemplate.cloneNode(true);
      var commentImg = comment.querySelector('img');
      var commentTextBlock = comment.querySelector('.social__text');

      commentImg.src = commentData.avatar;
      commentTextBlock.textContent = commentData.message;

      commentsFragment.appendChild(comment);
    });

    bigPictureCommentsBlock.appendChild(commentsFragment);
    bigPictureShowCommentsCountBlock.classList.add('visually-hidden');
    bigPictureCommentsLoaderBlock.classList.add('visually-hidden');
    bigPictureBlock.classList.remove('hidden');

    var bigPictureCloseButton = bigPictureBlock.querySelector('#picture-cancel');

    var onBigPictureCloseButtonClick = function () {
      window.closeBigPictureBlock();
    };
    var onEscKeydown = function (evtKeydown) {
      if (evtKeydown.key === window.utility.ESC_KEY) {
        window.closeBigPictureBlock();
      }
    };
    bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
    document.addEventListener('keydown', onEscKeydown);

    window.closeBigPictureBlock = function () {
      bigPictureBlock.classList.add('hidden');
      bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
      document.removeEventListener('keydown', onEscKeydown);
    };
  };
})();
