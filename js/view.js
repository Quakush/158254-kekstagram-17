'use strict';

(function () {
  var view = document.querySelector('.big-picture');
  var imgView = view.querySelector('.big-picture__img img');
  var likes = view.querySelector('.likes-count');
  var commentsCount = view.querySelector('.comments-count');
  var comments = view.querySelector('.social__comments');
  var counter = view.querySelector('.social__comment-count');
  var commentLoader = view.querySelector('.comments-loader');
  var description = view.querySelector('.social__caption');

  var setDataView = function (obj) {
    var viewData = obj;

    var setCommentsView = function (data) {
      data.comments.forEach(function (it) {
        var commentItem = document.createElement('li');
        commentItem.classList.add('social__comment');

        var avatar = document.createElement('img');
        avatar.classList.add('social__picture');
        avatar.src = it.avatar;
        avatar.width = '35';
        avatar.height = '35';
        avatar.alt = 'Аватар комментатора фотографии';

        var text = document.createElement('p');
        text.classList.add('social__text');
        text.textContent = it.message;

        commentItem.appendChild(avatar);
        commentItem.appendChild(text);
        comments.appendChild(commentItem);
      });
    };

    imgView.src = obj.url;
    likes.textContent = obj.likes;
    commentsCount.textContent = obj.comments.length;
    description.textContent = obj.description;
    setCommentsView(viewData);
  };

  var showView = function (data) {
    view.classList.remove('hidden');
    counter.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
    setDataView(data);
  };

  window.showView = showView;
})();
