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
  arrayHasDuplicates: function (array) {
    var lowercaseArray = array.map(function (item) {
      return item.toLowerCase();
    });

    var duplicates = lowercaseArray.filter(function (elem, pos, arr) {
      return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
    });

    return duplicates.length > 0;
  }
};
