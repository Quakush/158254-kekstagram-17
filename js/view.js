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

  var removeComments = function () {
    comments.innerHTML = '';
  };

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

  var showView = function (data) {
    var viewData = Object.create(data);
    var currentData = viewData.comments.slice();

    var setDataView = function (obj) {

      imgView.src = obj.url;
      likes.textContent = obj.likes;
      commentsCount.textContent = obj.comments.length;
      description.textContent = obj.description;
    };

    var setCommentsView = function (comm) {
      var commentsShow = comm.length > COMMENTS_SHOW ? COMMENTS_SHOW : comm.length;
      for (var i = 0; i < commentsShow; i++) {
        createComment(comm[0]);
        comm.shift();
      }
      if (comm.length === 0) {
        commentLoader.classList.add('visually-hidden');
      }
    };

    var onCommentLoaderClick = function () {
      setCommentsView(currentData);
    };

    var closeView = function () {
      removeComments();
      view.classList.add('hidden');
      closeButton.removeEventListener('click', onViewCloseClick);
      closeButton.removeEventListener('keydown', onViewKeydownEnter);
      document.removeEventListener('keydown', onViewKeydownEsc);
      commentLoader.removeEventListener('click', onCommentLoaderClick);
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

    removeComments();
    commentLoader.classList.remove('visually-hidden');
    view.classList.remove('hidden');
    counter.classList.add('visually-hidden');
    setDataView(viewData);
    setCommentsView(currentData);
    closeButton.addEventListener('click', onViewCloseClick);
    closeButton.addEventListener('keydown', onViewKeydownEnter);
    document.addEventListener('keydown', onViewKeydownEsc);
    commentLoader.addEventListener('click', onCommentLoaderClick);
  };

  window.showView = showView;
})();
