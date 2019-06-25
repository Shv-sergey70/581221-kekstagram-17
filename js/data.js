'use strict';

(function () {
  var USERS_PHOTOS_NUMBER = 25;
  var MIN_LIKES_NUMBER = 15;
  var MAX_LIKES_NUMBER = 200;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVARAT_NUMBER = 6;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTS_USER_NAMES = [
    'Артем',
    'Андрей',
    'Виктор',
    'Сергей',
    'Варвара',
    'Мария'
  ];

  var getComment = function (comments) {
    var commentsCopy = comments;
    var generatedComments = [];

    var numberOfCommentsInOneString = window.utility.generateRandomIntegerInRange(1, 2);

    for (var i = 1; i <= numberOfCommentsInOneString; i++) {
      generatedComments.push(commentsCopy.splice(window.utility.generateRandomIntegerInRange(1, commentsCopy.length), 1));
    }

    return generatedComments.join(' ');
  };

  var generateComment = function () {
    return {
      avatar: 'img/avatar-' + window.utility.generateRandomIntegerInRange(MIN_AVATAR_NUMBER, MAX_AVARAT_NUMBER) + '.svg',
      message: getComment(COMMENTS),
      name: window.utility.getRandomElementFromArray(COMMENTS_USER_NAMES)
    };
  };

  var generateComments = function (commentsNumber) {
    var comments = [];

    for (var i = 0; i < commentsNumber; i++) {
      comments.push(generateComment());
    }

    return comments;
  };

  var generateUserPicture = function (i) {
    return {
      url: 'photos/' + i + '.jpg',
      likes: window.utility.generateRandomIntegerInRange(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
      comments: generateComments(window.utility.generateRandomIntegerInRange(1, 4))
    };
  };

  window.generateUsersPhotoData = function () {
    var pictures = [];

    for (var i = 1; i <= USERS_PHOTOS_NUMBER; i++) {
      pictures.push(generateUserPicture(i));
    }

    return pictures;
  };
})();
