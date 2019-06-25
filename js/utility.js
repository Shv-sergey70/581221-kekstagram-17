'use strict';

window.utility = {
  ESC_KEY: 'Escape',
  MAX_PERCENT: 100,
  generateRandomIntegerInRange: function (min, max) {
    return Math.floor((Math.random() * (max + 1 - min)) + min);
  },
  getRandomElementFromArray: function (arr) {
    return arr[this.generateRandomIntegerInRange(0, arr.length)];
  }
};
