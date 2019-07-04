'use strict';

(function () {
  window.renderBigPicture = function (pictureData) {
    var commentsLoader = new window.CommentsLoader(pictureData.comments);
    var bigPictureBlock = document.querySelector('.big-picture');
    var bigPictureImg = bigPictureBlock.querySelector('.big-picture__img img');
    var bigPictureDescriptionBlock = bigPictureBlock.querySelector('.social__caption');
    var bigPictureLikesCountBlock = bigPictureBlock.querySelector('.likes-count');
    var bigPictureCommentsLoaderBlock = bigPictureBlock.querySelector('.comments-loader');

    bigPictureImg.src = pictureData.url;
    bigPictureDescriptionBlock.textContent = pictureData.description;
    bigPictureLikesCountBlock.textContent = pictureData.likes;
    commentsLoader.resetCommentsBlock();
    commentsLoader.setTotalComments();
    commentsLoader.loadComments();

    var onLoaderBlockClick = function () {
      commentsLoader.loadComments();

      if (commentsLoader.isAllCommentsRendered()) {
        commentsLoader.hideLoader();
        commentsLoader._commentsLoaderBlock.removeEventListener('click', onLoaderBlockClick);
      }
    };

    if (commentsLoader.isAllCommentsRendered()) {
      commentsLoader.hideLoader();
    } else {
      bigPictureCommentsLoaderBlock.addEventListener('click', onLoaderBlockClick);
    }

    bigPictureBlock.classList.remove('hidden');

    var bigPictureCloseButton = bigPictureBlock.querySelector('#picture-cancel');

    var onBigPictureCloseButtonClick = function () {
      closeBigPictureBlock();
    };
    var onEscKeydown = function (evtKeydown) {
      if (evtKeydown.key === window.utility.ESC_KEY) {
        closeBigPictureBlock();
      }
    };
    bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
    document.addEventListener('keydown', onEscKeydown);

    var closeBigPictureBlock = function () {
      bigPictureBlock.classList.add('hidden');
      bigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
      document.removeEventListener('keydown', onEscKeydown);
      bigPictureCommentsLoaderBlock.removeEventListener('click', onLoaderBlockClick);
    };
  };
})();
