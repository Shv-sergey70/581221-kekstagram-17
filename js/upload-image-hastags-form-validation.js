'use strict';

(function () {
  window.uploadImageHashtagsValidate = function () {
    var hashtagsInput = document.querySelector('[name="hashtags"]');
    var hashtagsValidator = {
      firstLattice: {
        validate: function (hashtags, currentHashtag) {
          return currentHashtag[0] !== '#';
        },
        isValid: true,
        errorMessage: 'Хеш-тег должен начинаться с символа # (решётка)'
      },
      onlyLattice: {
        validate: function (hashtags, currentHashtag) {
          return currentHashtag[0] === '#' && currentHashtag.length === 1;
        },
        isValid: true,
        errorMessage: 'Хеш-тег не может состоять только из одной решётки'
      },
      maxFiveHashtags: {
        validate: function (hashtags) {
          return hashtags.length > 5;
        },
        isValid: true,
        errorMessage: 'Нельзя указать больше пяти хэш-тегов'
      },
      maxHashtagLength: {
        validate: function (hashtags, currentHashtag) {
          return currentHashtag.length > 20;
        },
        isValid: true,
        errorMessage: 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
      },
      hasNotDuplicatedHashtags: {
        validate: function (hashtags) {
          return window.utility.arrayHasDuplicates(hashtags);
        },
        isValid: true,
        errorMessage: 'Один и тот же хэш-тег не может быть использован дважды'
      },
    };

    function hashtagsValidate(hashtagsArray) {
      hashtagsArray.filter(function (hashtag, index, hashtags) {
        for (var validator in hashtagsValidator) {
          if (hashtagsValidator.hasOwnProperty(validator)) {
            if (hashtagsValidator[validator]['validate'](hashtags, hashtag)) {
              hashtagsValidator[validator]['isValid'] = false;
            }
          }
        }
      });
    }

    function getErrorMessage() {
      var message = '';

      for (var validator in hashtagsValidator) {
        if (!hashtagsValidator[validator]['isValid']) {
          message += hashtagsValidator[validator]['errorMessage'] + ' ';
        }
      }

      return message;
    }

    if (hashtagsInput.value.length !== 0) {
      var hashtagsArray = hashtagsInput.value.split(' ');

      hashtagsValidate(hashtagsArray);
    }

    return getErrorMessage();
  };
})();
