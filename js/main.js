'use strict';

var ESC_CODE = 27;
var ENTER_CODE = 13;
var PHOTOS_ON_PAGE = 25;
var PROPORTION_FACTOR = 3;
var BEGIN_VALUE = 1;
var MIN = 0; // начальное значения для диапазона случайных чисел
var MIN_LIKES = 15; // минимальное кол-вл лайков
var MAX_LIKES = 200; // максимальное кол-во лайков
var template = document.querySelector('#picture').content.querySelector('.picture');
var container = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var uploadFileInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var img = imgUploadPreview.querySelector('img');
var closeOverlayButton = document.querySelector('.img-upload__cancel');
var effectsList = document.querySelector('.effects__list');
var slider = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');

var names = ['Сергей', 'Алена', 'Вован', 'Колясик', 'Любаша', 'Света', 'Гюльчатай', 'Боб', 'Джонни', 'Жанна'];

var messages = [
  'Все отлично!',
  'В целом все неплохо. Но не все.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var avatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getComments = function () {
  var text = [];
  for (var i = 0; i < getRandom(MIN, messages.length); i++) { // случайное кол-во комментариев
    text[i] = messages[getRandom(MIN, messages.length)]; // заполняю случайнм комментарием
  }
  var comment = {
    avatar: avatars[getRandom(MIN, avatars.length)],
    message: text,
    name: names[getRandom(MIN, names.length)]
  };
  return comment;
};

var initPhoto = function () {
  var photos = [];

  for (var i = 0; i < PHOTOS_ON_PAGE; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(MIN_LIKES, MAX_LIKES),
      comments: getComments()
    };
    var photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photos[i].url;
    photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photos[i].comments.message.length;
    fragment.appendChild(photoElement);
  }
  return fragment;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (!(document.activeElement.className === 'text__description')) {
      closeUploadOverlay();
    }
  }
};

var showUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFileInput.value = '';
};

var getPinPosition = function () {
  return (slider.offsetLeft / levelLine.clientWidth).toFixed(1);
};

container.appendChild(initPhoto());

uploadFileInput.addEventListener('change', function () {
  showUploadOverlay();
  img.classList.add('effects__preview--heat');
});

closeOverlayButton.addEventListener('click', function () {
  closeUploadOverlay();
});

closeOverlayButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeUploadOverlay();
  }
});

effectsList.addEventListener('change', function (evt) {
  var currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    img.className = '';
    img.style.filter = 'none';
  }

  if (currentEffect === 'chrome') {
    img.className = 'effects__preview--chrome';
    img.style.filter = 'grayscale(' + getPinPosition() + ')';
  }
  if (currentEffect === 'sepia') {
    img.className = 'effects__preview--sepia';
    img.style.filter = 'sepia(' + getPinPosition() + ')';
  }
  if (currentEffect === 'marvin') {
    img.className = 'effects__preview--marvin';
    img.style.filter = 'invert(' + getPinPosition() * 100 + '%)';
  }
  if (currentEffect === 'phobos') {
    img.className = 'effects__preview--phobos';
    img.style.filter = 'blur(' + (getPinPosition() * PROPORTION_FACTOR).toFixed(1) + 'px)';
  }
  if (currentEffect === 'heat') {
    img.className = 'effects__preview--heat';
    img.style.filter = 'brightness(' + (getPinPosition() * PROPORTION_FACTOR + BEGIN_VALUE).toFixed(1) + ')';
  }
});


