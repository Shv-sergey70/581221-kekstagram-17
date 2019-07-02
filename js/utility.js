'use strict';

window.utility = {
  ESC_KEY: 'Escape',
  MAX_PERCENT: 100,
  generateRandomIntegerInRange: function (min, max) {
    return Math.floor((Math.random() * (max + 1 - min)) + min);
  },
  getRandomElementFromArray: function (arr) {
    return arr[this.generateRandomIntegerInRange(0, arr.length)];
  },
  debounce: function (milliseconds) {
    var lastTimeout;

    return function (callback) {
      var args = arguments;

      if (lastTimeout !== undefined) {
        clearTimeout(lastTimeout);
      }

      lastTimeout = setTimeout(function () {
        callback.apply(null, args);
      }, milliseconds);
    };
  },
  onEscKeydown: function (evtKeydown) {
    if (evtKeydown.key === window.utility.ESC_KEY) {
      var commentTextarea = document.querySelector('[name="description"]');

      if (evtKeydown.target !== commentTextarea) {
        window.closeImageEditPopup();
      }
      window.closeBigPictureBlock();
    }
  }
};
