'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var container = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  var successHandler = function (content) {

    var initPhoto = function () {
      for (var i = 0; i < content.length; i++) {
        var photoElement = template.cloneNode(true);

        photoElement.querySelector('.picture__img').src = content[i].url;
        photoElement.querySelector('.picture__likes').textContent = content[i].likes;
        photoElement.querySelector('.picture__comments').textContent = content[i].comments.length;
        fragment.appendChild(photoElement);
      }
      return fragment;
    };

    container.appendChild(initPhoto());
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();

