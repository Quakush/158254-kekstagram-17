'use strict';

var template = document.querySelector('#picture').content.querySelector('.picture');
var container = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

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
  for (var i = 0; i < getRandom(1, 5); i++) {
    text[i] = messages[getRandom(0, 5)];
  }
  var comment = {
    avatar: avatars[getRandom(0, 5)],
    message: text,
    name: names[getRandom(0, 9)]
  };
  return comment;
};

var initPhoto = function () {
  var photos = [];

  for (var i = 0; i < 25; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
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

container.appendChild(initPhoto());
