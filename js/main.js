'use strict';

var ESC_KEY = 'Escape';
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

var generateRandomIntegerInRange = function (min, max) {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};

var getRandomElementFromArray = function (arr) {
  return arr[generateRandomIntegerInRange(0, arr.length)];
};

var getComment = function (comments) {
  var commentsCopy = comments;
  var generatedComments = [];

  var numberOfCommentsInOneString = generateRandomIntegerInRange(1, 2);

  for (var i = 1; i <= numberOfCommentsInOneString; i++) {
    generatedComments.push(commentsCopy.splice(generateRandomIntegerInRange(1, commentsCopy.length), 1));
  }

  return generatedComments.join(' ');
};

var generateComment = function () {
  return {
    avatar: 'img/avatar-' + generateRandomIntegerInRange(MIN_AVATAR_NUMBER, MAX_AVARAT_NUMBER) + '.svg',
    message: getComment(COMMENTS),
    name: getRandomElementFromArray(COMMENTS_USER_NAMES)
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
    likes: generateRandomIntegerInRange(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
    comment: generateComments(generateRandomIntegerInRange(1, 4))
  };
};

var dataObjects = function () {
  var pictures = [];

  for (var i = 1; i <= USERS_PHOTOS_NUMBER; i++) {
    pictures.push(generateUserPicture(i));
  }

  return pictures;
};

var picturesArray = dataObjects();

var generatePictureDomElement = function (template, pictureData) {
  template.querySelector('.picture__img').src = pictureData.url;
  template.querySelector('.picture__likes').innerText = pictureData.likes;
  template.querySelector('.picture__comments').innerText = pictureData.comment.length;

  return template;
};

var getFilledPicturesFragment = function () {
  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < picturesArray.length; i++) {
    var template = document.querySelector('#picture').content.querySelector('.picture').cloneNode(true);
    picturesFragment.appendChild(generatePictureDomElement(template, picturesArray[i]));
  }

  return picturesFragment;
};

var picturesBlock = document.querySelector('.pictures');
picturesBlock.appendChild(getFilledPicturesFragment());

var selectImageForm = document.querySelector('#upload-select-image');
var uploadFileInput = document.querySelector('#upload-file');
var imageEditPopup = document.querySelector('.img-upload__overlay');

var closeImageEditPopup = function () {
  imageEditPopup.classList.add('hidden');
  selectImageForm.reset();
};

var openImageEditPopup = function () {
  imageEditPopup.classList.remove('hidden');
};

uploadFileInput.addEventListener('change', function () {
  var closeImageEditPopupButton = imageEditPopup.querySelector('#upload-cancel');

  openImageEditPopup();

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      closeImageEditPopup();
    }
  });
  closeImageEditPopupButton.addEventListener('click', function () {
    closeImageEditPopup();
  });
});
