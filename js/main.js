'use strict';

(function () {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var container = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var filtersImg = document.querySelector('.img-filters');
  var popularFilterButton = document.querySelector('#filter-popular');
  var newFilterButton = document.querySelector('#filter-new');
  var discussedFilterButton = document.querySelector('#filter-discussed');

  var imgData = [];

  var clearPhoto = function () {
    var pictures = Array.from(container.querySelectorAll('.picture'));
    pictures.forEach(function (it) {
      it.parentNode.removeChild(it);
    });
  };

  var initPhoto = function (it) {
    var photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = it.url;
    photoElement.querySelector('.picture__likes').textContent = it.likes;
    photoElement.querySelector('.picture__comments').textContent = it.comments.length;
    fragment.appendChild(photoElement);

    return fragment;
  };

  var renderPhotos = function (arr) {
    arr.forEach(function (it) {
      container.appendChild(initPhoto(it));
    });
  };

  var successHandler = function (content) {
    imgData = content;

    renderPhotos(imgData);
    filtersImg.classList.remove('img-filters--inactive');
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

  var onPopularFilter = window.debounce(function () {
    if (!popularFilterButton.classList.contains('img-filters__button--active')) {
      popularFilterButton.classList.add('img-filters__button--active');
    }
    discussedFilterButton.classList.remove('img-filters__button--active');
    newFilterButton.classList.remove('img-filters__button--active');
    clearPhoto();
    renderPhotos(imgData);
  });

  var onNewFilter = window.debounce(function () {
    if (!newFilterButton.classList.contains('img-filters__button--active')) {
      newFilterButton.classList.add('img-filters__button--active');
    }
    popularFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');

    var POPULAR_PHOTOS_QUANTITY = 10;

    var sortArray = [];
    while (sortArray.length < POPULAR_PHOTOS_QUANTITY) {
      var num;
      var random = Math.floor(Math.random() * imgData.length);

      if (num !== random) {
        sortArray.push(imgData[random]);
      }
      num = random;
    }
    clearPhoto();
    renderPhotos(sortArray);
  });

  var onDiscussFilter = window.debounce(function () {
    if (!discussedFilterButton.classList.contains('img-filters__button--active')) {
      discussedFilterButton.classList.add('img-filters__button--active');
    }
    popularFilterButton.classList.remove('img-filters__button--active');
    newFilterButton.classList.remove('img-filters__button--active');

    var commentsQuantity = imgData.slice();

    var compareComments = function (a, b) {
      return b.comments.length - a.comments.length;
    };

    commentsQuantity.sort(compareComments);

    clearPhoto();
    renderPhotos(commentsQuantity);
  });

  window.load(successHandler, errorHandler);

  popularFilterButton.addEventListener('click', onPopularFilter);

  newFilterButton.addEventListener('click', onNewFilter);

  discussedFilterButton.addEventListener('click', onDiscussFilter);
})();
