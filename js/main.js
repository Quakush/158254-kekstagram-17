'use strict';

(function () {
  var NEW_PHOTOS_QUANTITY = 10;
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var container = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var filtersImg = document.querySelector('.img-filters');
  var activeButton = document.querySelector('.img-filters__button--active');

  var netData = [];

  var Sort = {
    'filter-popular': function (arr) {
      return arr;
    },
    'filter-discussed': function (arr) {
      return arr.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
    'filter-new': function (arr) {
      var sortArray = [];
      while (sortArray.length < NEW_PHOTOS_QUANTITY) {
        var num;
        var random = Math.floor(Math.random() * arr.length);

        if (num !== random) {
          sortArray.push(arr[random]);
        }
        num = random;
      }
      return sortArray;
    }
  };

  var successHandler = function (content) {
    netData = content;

    renderPhotos(netData);
    filtersImg.classList.remove('img-filters--inactive');
    document.addEventListener('click', onPictureClick);
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

  var clearPhoto = function () {
    var pictures = Array.from(container.querySelectorAll('.picture'));
    pictures.forEach(function (it) {
      it.parentNode.removeChild(it);
    });
  };

  var initPhoto = function (it, index) {
    var photoElement = template.cloneNode(true);
    var imgElement = photoElement.querySelector('.picture__img');

    imgElement.src = it.url;
    imgElement.dataset.index = index;
    photoElement.querySelector('.picture__likes').textContent = it.likes;
    photoElement.querySelector('.picture__comments').textContent = it.comments.length;
    fragment.appendChild(photoElement);

    return fragment;
  };

  var renderPhotos = function (arr) {
    var index = 0;
    arr.forEach(function (it) {
      container.appendChild(initPhoto(it, index));
      index++;
    });
  };

  var setFilterButtonActive = function (evt) {
    activeButton.classList.remove('img-filters__button--active');
    activeButton = evt.target;
    activeButton.classList.add('img-filters__button--active');
  };

  var onFilterButtonClick = window.debounce(function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      var sortArr = netData.slice();
      var arr = Sort[evt.target.id](sortArr);

      clearPhoto();
      renderPhotos(arr);
    }
  });

  var onPictureClick = function (evt) {
    var target = evt.target;

    if (target.classList.contains('picture__img')) {
      window.showView(netData[target.dataset.index]);
    }
  };

  window.load(successHandler, errorHandler);

  filtersImg.addEventListener('click', function (evt) {
    setFilterButtonActive(evt);
    onFilterButtonClick(evt);
  });
})();
