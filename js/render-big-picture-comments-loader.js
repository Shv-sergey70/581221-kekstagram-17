'use strict';

(function () {
  window.CommentsLoader = function (commentsArray) {
    this._commentsCount = {
      currentRendered: 0,
      forRender: 0,
      total: commentsArray.length
    };
    this._commentsArray = commentsArray;
    this._commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
    this._commentsCountSpan = document.querySelector('.comments-count');
    this._commentsTotalCountSpan = document.querySelector('.comments-count-total');
    this._commentsBlock = document.querySelector('.social__comments');
    this._commentsLoaderBlock = document.querySelector('.comments-loader');
    this.loadComments = function () {
      this._incrementCommentsForRender();
      this._commentsBlock.appendChild(this._generateFilledCommentsFragment());
      this._updateCommentsInfo();
    };
    this.setTotalComments = function () {
      this._commentsTotalCountSpan.textContent = this._commentsCount.total;
    };
    this._updateCommentsInfo = function () {
      this._commentsCountSpan.textContent = this._commentsCount.currentRendered;
    };
    this._incrementCommentsForRender = function () {
      this._commentsCount.forRender += 5;

      if (this._commentsCount.forRender > this._commentsCount.total) {
        this._commentsCount.forRender = this._commentsCount.total;
      }
    };
    this._generateFilledCommentsFragment = function () {
      var commentsFragment = document.createDocumentFragment();

      for (this._commentsCount.currentRendered; this._commentsCount.currentRendered < this._commentsCount.forRender; this._commentsCount.currentRendered++) {
        commentsFragment.appendChild(this._generateCommentDomElement(this._commentsArray[this._commentsCount.currentRendered]));
      }

      return commentsFragment;
    };
    this.resetCommentsBlock = function () {
      this._commentsBlock.textContent = '';
      this._commentsLoaderBlock.classList.remove('visually-hidden');
    };
    this._generateCommentDomElement = function (commentData) {
      var commentDomElement = this._commentTemplate.cloneNode(true);
      var commentImg = commentDomElement.querySelector('img');
      var commentTextBlock = commentDomElement.querySelector('.social__text');

      commentImg.src = commentData.avatar;
      commentTextBlock.textContent = commentData.message;

      return commentDomElement;
    };
    this.hideLoader = function () {
      this._commentsLoaderBlock.classList.add('visually-hidden');
    };
    this.isAllCommentsRendered = function () {
      return this._commentsCount.total === this._commentsCount.currentRendered;
    };
  };
})();
