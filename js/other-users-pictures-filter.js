'use strict';

(function () {
  window.activateOtherUsersPicturesFilter = function (picturesArray) {
    var filtersBlock = document.querySelector('.img-filters');
    var filtersPopularButton = filtersBlock.querySelector('#filter-popular');
    var filtersNewButton = filtersBlock.querySelector('#filter-new');
    var filtersDiscussedButton = filtersBlock.querySelector('#filter-discussed');

    filtersBlock.classList.remove('img-filters--inactive');

    var setActiveFilterButton = function (newActiveButton) {
      var currentActiveButton = document.querySelector('.img-filters__button--active');
      currentActiveButton.classList.remove('img-filters__button--active');
      newActiveButton.classList.add('img-filters__button--active');
    };

    var alsoIsActiveButton = function (button) {
      return button === document.querySelector('.img-filters__button--active');
    };

    var filterDebounce = window.utility.debounce(500);

    filtersPopularButton.addEventListener('click', function () {
      if (alsoIsActiveButton(filtersPopularButton)) {
        return;
      }

      setActiveFilterButton(filtersPopularButton);

      filterDebounce(function () {
        window.rerenderOtherUsersPictures(picturesArray);
      });
    });

    filtersNewButton.addEventListener('click', function () {
      if (alsoIsActiveButton(filtersNewButton)) {
        return;
      }

      setActiveFilterButton(filtersNewButton);

      filterDebounce(function () {
        var picturesArrayCopy = picturesArray.slice();
        var newUsersPhotos = [];

        for (var i = 0; i < 10; i++) {
          newUsersPhotos.push(picturesArrayCopy.splice(window.utility.generateRandomIntegerInRange(0, picturesArrayCopy.length - 1), 1)[0]);
        }

        window.rerenderOtherUsersPictures(newUsersPhotos);
      });
    });

    filtersDiscussedButton.addEventListener('click', function () {
      if (alsoIsActiveButton(filtersDiscussedButton)) {
        return;
      }

      setActiveFilterButton(filtersDiscussedButton);

      filterDebounce(function () {
        var sortedPicturesArray = picturesArray.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

        window.rerenderOtherUsersPictures(sortedPicturesArray);
      });
    });
  };
})();
