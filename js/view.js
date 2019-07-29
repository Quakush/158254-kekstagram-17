'use strict';

(function () {
  var COMMENTS_SHOW = 5;
  var view = document.querySelector('.big-picture');
  var imgView = view.querySelector('.big-picture__img img');
  var likes = view.querySelector('.likes-count');
  var commentsCount = view.querySelector('.comments-count');
  var comments = view.querySelector('.social__comments');
  var counter = view.querySelector('.social__comment-count');
  var commentLoader = view.querySelector('.comments-loader');
  var description = view.querySelector('.social__caption');
  var closeButton = view.querySelector('.big-picture__cancel');

  var createComment = function (data) {
    var commentItem = document.createElement('li');

    commentItem.classList.add('social__comment');

    var avatar = document.createElement('img');

    avatar.classList.add('social__picture');
    avatar.src = data.avatar;
    avatar.width = '35';
    avatar.height = '35';
    avatar.alt = 'Аватар комментатора фотографии';

    var text = document.createElement('p');

    text.classList.add('social__text');
    text.textContent = data.message;
    commentItem.appendChild(avatar);
    commentItem.appendChild(text);
    comments.appendChild(commentItem);
  };

  var onCommentLoaderClick = function () {
    setCommentsView('?');
  };

  var setCommentsView = function (data) {
    var commentsShow = data.comments.length > COMMENTS_SHOW ? COMMENTS_SHOW : data.comments.length;
    for (var i = 0; i < commentsShow; i++) {
      createComment(data.comments[0]);
      data.comments.shift();
    }
    if (data.comments.length === 0) {
      commentLoader.classList.add('visually-hidden');
    }
  };

  var setDataView = function (obj) {
    var viewData = obj;

    imgView.src = obj.url;
    likes.textContent = obj.likes;
    commentsCount.textContent = obj.comments.length;
    description.textContent = obj.description;
    setCommentsView(viewData);
  };

  var showView = function (data) {
    removeComments();
    commentLoader.classList.remove('visually-hidden');
    view.classList.remove('hidden');
    counter.classList.add('visually-hidden');
    setDataView(data);
    closeButton.addEventListener('click', onViewCloseClick);
    closeButton.addEventListener('keydown', onViewKeydownEnter);
    document.addEventListener('keydown', onViewKeydownEsc);
    commentLoader.addEventListener('click', onCommentLoaderClick);
  };

  var removeComments = function () {
    comments.innerHTML = '';
  };

  var closeView = function () {
    removeComments();
    view.classList.add('hidden');
    closeButton.removeEventListener('click', onViewCloseClick);
    closeButton.removeEventListener('keydown', onViewKeydownEnter);
    document.removeEventListener('keydown', onViewKeydownEsc);
    commentLoader.removeEventListener('click', onCommentLoaderClick)
  };

  var onViewKeydownEsc = function (evt) {
    window.utils.isKeydownEsc(evt, closeView);
  };

  var onViewKeydownEnter = function (evt) {
    window.utils.isKeydownEnter(evt, closeView);
  };

  var onViewCloseClick = function () {
    closeView();
  };

  window.showView = showView;
})();
