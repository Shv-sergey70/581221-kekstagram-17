'use strict';

(function () {
  window.Scale = function () {
    this._values = {
      MAX: 100,
      MIN: 25,
      step: 25,
      current: 100,
      default: 100
    };

    this._uploadImgBlock = document.querySelector('.img-upload__preview');
    this._scaleFiledset = document.querySelector('.scale');
    this._scaleValueInput = this._scaleFiledset.querySelector('.scale__control--value');
    this._biggerButton = this._scaleFiledset.querySelector('.scale__control--bigger');
    this._smallerButton = this._scaleFiledset.querySelector('.scale__control--smaller');

    this._changeImgScale = function () {
      this._uploadImgBlock.style.transform = 'scale(' + this._values.current / 100 + ')';
    };
    this._changeInputValue = function () {
      this._scaleValueInput.value = this._values.current + '%';
    };
    this._onBiggerButtonClick = (function () {
      this._values.current += this._values.step;

      if (this._values.current > this._values.MAX) {
        this._values.current = this._values.MAX;
      }

      this._changeImgScale();
      this._changeInputValue();
    }).bind(this);
    this._onSmallerButtonClick = (function () {
      this._values.current -= this._values.step;

      if (this._values.current < this._values.MIN) {
        this._values.current = this._values.MIN;
      }

      this._changeImgScale();
      this._changeInputValue();
    }).bind(this);
    this.addScaleButtonsListeners = function () {
      this._biggerButton.addEventListener('click', this._onBiggerButtonClick);
      this._smallerButton.addEventListener('click', this._onSmallerButtonClick);
    };
    this.resetScaleValueAndListeners = function () {
      this._biggerButton.removeEventListener('click', this._onBiggerButtonClick);
      this._smallerButton.removeEventListener('click', this._onSmallerButtonClick);
      this._values.current = this._values.default;
      this._changeImgScale();
    };
  };
})();
