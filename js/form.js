'use strict';

(function () {
  var filters = {
    'effect-none': {
      id: 'effect-none',
      class: 'effects__preview--none',
      cssEffect: ''
    },
    'effect-chrome': {
      id: 'effect-chrome',
      class: 'effects__preview--chrome',
      cssEffect: 'grayscale',
      min: 0,
      max: 1
    },
    'effect-sepia': {
      id: 'effect-sepia',
      class: 'effects__preview--sepia',
      cssEffect: 'sepia',
      min: 0,
      max: 1
    },
    'effect-marvin': {
      id: 'effect-marvin',
      class: 'effects__preview--marvin',
      cssEffect: 'invert',
    },
    'effect-phobos': {
      id: 'effect-phobos',
      class: 'effects__preview--phobos',
      cssEffect: 'blur',
      min: 0,
      max: 3
    },
    'effect-heat': {
      id: 'effect-heat',
      class: 'effects__preview--heat',
      cssEffect: 'brightness',
      min: 1,
      max: 3
    }
  };

  var getFilterDepth = function (percent, min, max) {
    return (Number(max * percent / window.utility.MAX_PERCENT) + min).toFixed(2);
  };

  var resetFilter = function (image) {
    for (var filter in filters) {
      if (image.classList.contains(filters[filter]['class'])) {
        image.classList.remove(filters[filter]['class']);
      }
    }
  };

  var getCssFilter = function (image, percent) {
    var filterStyle;
    switch (true) {
      case image.classList.contains(filters['effect-chrome']['class']): {
        filterStyle = filters['effect-chrome']['cssEffect'] + '(' + getFilterDepth(percent, filters['effect-chrome']['min'], filters['effect-chrome']['max']) + ')';
        break;
      }
      case image.classList.contains(filters['effect-sepia']['class']): {
        filterStyle = filters['effect-sepia']['cssEffect'] + '(' + getFilterDepth(percent, filters['effect-sepia']['min'], filters['effect-sepia']['max']) + ')';
        break;
      }
      case image.classList.contains(filters['effect-marvin']['class']): {
        filterStyle = filters['effect-marvin']['cssEffect'] + '(' + percent.toFixed(2) + '%)';
        break;
      }
      case image.classList.contains(filters['effect-phobos']['class']): {
        filterStyle = filters['effect-phobos']['cssEffect'] + '(' + getFilterDepth(percent, filters['effect-phobos']['min'], filters['effect-phobos']['max']) + 'px)';
        break;
      }
      case image.classList.contains(filters['effect-heat']['class']): {
        filterStyle = filters['effect-heat']['cssEffect'] + '(' + getFilterDepth(percent, filters['effect-heat']['min'], filters['effect-heat']['max']) + ')';
        break;
      }
      default: {
        filterStyle = filters['effect-none']['cssEffect'];
      }
    }

    return filterStyle;
  };

  var effectsList = document.querySelector('.effects__list');
  var uploadImageBlock = document.querySelector('.img-upload__preview');
  var effectsLevelFieldset = document.querySelector('.effect-level');
  var effectsLevelLine = document.querySelector('.effect-level__line');
  var effectsLevelPin = document.querySelector('.effect-level__pin');
  var effectsLevelDepthLine = document.querySelector('.effect-level__depth');
  var effectLevelInput = document.querySelector('.effect-level__value');

  var moveSliderPin = function (movingCoordinate) {
    effectsLevelPin.style.left = movingCoordinate + 'px';
    effectsLevelDepthLine.style.width = movingCoordinate + 'px';
  };

  effectsLevelPin.addEventListener('mousedown', function (mouseDownEvt) {
    var effectDepth = {
      min: 0,
      max: effectsLevelLine.offsetWidth,
      percent: window.utility.MAX_PERCENT
    };
    var startCoordinate = mouseDownEvt.clientX;

    var onSliderMouseMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();
      var shift = startCoordinate - mouseMoveEvt.clientX;

      startCoordinate = mouseMoveEvt.clientX;
      var pinShifting = effectsLevelPin.offsetLeft - shift;

      if (pinShifting >= effectDepth.min && pinShifting <= effectDepth.max) {
        moveSliderPin(pinShifting);
      }

      effectDepth.percent = Math.round(pinShifting * window.utility.MAX_PERCENT / effectDepth.max);
      uploadImageBlock.style.filter = getCssFilter(uploadImageBlock, effectDepth.percent);
      effectLevelInput.value = effectDepth.percent;
    };
    var onSliderMouseUp = function () {
      document.removeEventListener('mousemove', onSliderMouseMove);
      document.removeEventListener('mouseup', onSliderMouseUp);
    };
    document.addEventListener('mousemove', onSliderMouseMove);
    document.addEventListener('mouseup', onSliderMouseUp);
  });

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('effects__radio')) {
      resetFilter(uploadImageBlock);
      var filter = evt.target;

      if (filter.id === filters['effect-none']['id']) {
        effectsLevelFieldset.classList.add('hidden');
      } else {
        effectsLevelFieldset.classList.remove('hidden');
      }

      var filterData = filters[filter.id];
      uploadImageBlock.classList.add(filterData['class']);
      uploadImageBlock.style.filter = getCssFilter(uploadImageBlock, window.utility.MAX_PERCENT);
      moveSliderPin(effectsLevelLine.offsetWidth);
      effectLevelInput.value = window.utility.MAX_PERCENT;
    }
  });

  var uploadImageForm = document.querySelector('#upload-select-image');
  var uploadImageFormSubmitButton = uploadImageForm.querySelector('#upload-submit');
  var hashtagsInput = document.querySelector('[name="hashtags"]');
  var SEND_UPLOAD_FORM_URL = 'https://js.dump.academy/kekstagram';

  uploadImageFormSubmitButton.addEventListener('click', function () {
    hashtagsInput.setCustomValidity(window.uploadImageHashtagsValidate());
  });

  uploadImageForm.addEventListener('submit', function (evtSubmit) {
    evtSubmit.preventDefault();
    var mainTag = document.querySelector('main');

    var onSuccess = function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successBlock = successTemplate.cloneNode(true);
      var successButton = successBlock.querySelector('.success__button');

      window.closeImageEditPopup();
      uploadImageForm.reset();

      var closeSuccessPopup = function () {
        successBlock.remove();
        document.removeEventListener('keydown', onEscPress);
        successBlock.removeEventListener('click', onSuccessBlockClick);
        successButton.removeEventListener('click', onSuccessButtonClick);
      };

      var onEscPress = function (evtKeydown) {
        if (evtKeydown.key === window.utility.ESC_KEY) {
          closeSuccessPopup();
        }
      };
      var onSuccessButtonClick = function() {
        closeSuccessPopup();
      };
      var onSuccessBlockClick = function (evtClick) {
        if (evtClick.target === successBlock) {
          closeSuccessPopup();
        }
      };

      document.addEventListener('keydown', onEscPress);
      successBlock.addEventListener('click', onSuccessBlockClick);

      successButton.addEventListener('click', onSuccessButtonClick);
      mainTag.appendChild(successBlock);
    };
    var onError = function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorBlock = errorTemplate.cloneNode(true);
      var errorButtonsBlock = errorBlock.querySelector('.error__buttons');

      window.closeImageEditPopup();
      uploadImageForm.reset();

      var onErrorButtonsBlockClick = function (evtClick) {
        if (evtClick.target.classList.contains('error__button')) {
          closeErrorPopup();
        }
      };
      errorButtonsBlock.addEventListener('click', onErrorButtonsBlockClick);

      var closeErrorPopup = function () {
        errorBlock.remove();
        document.removeEventListener('keydown', onEscPress);
        errorBlock.removeEventListener('click', onErrorBlockClick);
        errorButtonsBlock.removeEventListener('click', onErrorButtonsBlockClick);
      };
      var onEscPress = function (evtKeydown) {
        if (evtKeydown.key === window.utility.ESC_KEY) {
          closeErrorPopup();
        }
      };
      var onErrorBlockClick = function (evtClick) {
        if (evtClick.target === errorBlock) {
          closeErrorPopup();
        }
      };

      document.addEventListener('keydown', onEscPress);
      errorBlock.addEventListener('click', onErrorBlockClick);

      mainTag.appendChild(errorBlock);
    };

    window.backend.save(SEND_UPLOAD_FORM_URL, new FormData(uploadImageForm), onSuccess, onError);
  });
})();
