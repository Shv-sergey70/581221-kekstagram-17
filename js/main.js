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
var MAX_PERCENT = 100;

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
var commentTextarea = document.querySelector('[name="description"]');

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
    if (evt.key === ESC_KEY && evt.target !== commentTextarea) {
      closeImageEditPopup();
    }
  });
  closeImageEditPopupButton.addEventListener('click', function () {
    closeImageEditPopup();
  });
});

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
  return (Number(max * percent / MAX_PERCENT) + min).toFixed(2);
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

var moveSliderPin = function (movingCoordinate) {
  effectsLevelPin.style.left = movingCoordinate + 'px';
  effectsLevelDepthLine.style.width = movingCoordinate + 'px';
};

effectsLevelPin.addEventListener('mousedown', function (mouseDownEvt) {
  var effectDepth = {
    min: 0,
    max: effectsLevelLine.offsetWidth,
    percent: MAX_PERCENT
  };
  var startCoordinate = mouseDownEvt.clientX;

  var onSliderMouseMove = function (mouseMoveEvt) {
    var shift = startCoordinate - mouseMoveEvt.clientX;

    startCoordinate = mouseMoveEvt.clientX;
    var pinShifting = effectsLevelPin.offsetLeft - shift;

    if (pinShifting >= effectDepth.min && pinShifting <= effectDepth.max) {
      moveSliderPin(pinShifting);
    }

    effectDepth.percent = pinShifting * MAX_PERCENT / effectDepth.max;
    uploadImageBlock.style.filter = getCssFilter(uploadImageBlock, effectDepth.percent);
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
    uploadImageBlock.style.filter = getCssFilter(uploadImageBlock, MAX_PERCENT);
    moveSliderPin(effectsLevelLine.offsetWidth);
  }
});
