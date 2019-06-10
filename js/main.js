'use strict';
var template = document.querySelector('#picture').content.querySelector('.picture');
var container = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var templateImg = template.querySelector('.picture__img');
var templateComment = template.querySelector('.picture__comments');
var templateLikes = template.querySelector('.picture__likes');

var names = ['Сергей', 'Алена', 'Вован', 'Колясик', 'Любаша', 'Света', 'Гюльчатай', 'Боб', 'Джонни', 'Жанна'];

var comments = [
  'Все отлично!',
  'В целом все неплохо. Но не все.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var avatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];

var getRandom = function (list) {
  return Math.floor(Math.random() * list.lenght);
};

var getName = function (names) {
  return names[getRandom(names)];
};

var getComment = function (comments) {
  return comments[getRandom(comments)];
};

var name = getRandom(names);
var comment = getRandom(comments);
var avatar = getRandom(avatars);

var initPhoto = function (name, comment, avatar) {

};


