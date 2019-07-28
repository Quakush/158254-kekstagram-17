'use strict';

(function () {
  var COMMENTS_SHOW = 5;
  var commentsCounter = 0;
  var view = document.querySelector('.big-picture');
  var imgView = view.querySelector('.big-picture__img img');
  var likes = view.querySelector('.likes-count');
  var commentsCount = view.querySelector('.comments-count');
  var comments = view.querySelector('.social__comments');
  var counter = view.querySelector('.social__comment-count');
  var commentLoader = view.querySelector('.comments-loader');
  var description = view.querySelector('.social__caption');
  var closeButton = view.querySelector('.big-picture__cancel');

  var setDataView = function (obj) {
    var viewData = obj;
    var commentsInData = viewData.comments.length;

    var setCommentsView = function (data) {
      var commentsTotalShow = commentsInData > COMMENTS_SHOW ? COMMENTS_SHOW : commentsInData;
      console.log('колво показываемых комментов ' + commentsTotalShow);
      for (var i = 0; i < commentsTotalShow; i++) {
        console.log('счетчик комментов до итерации ' + commentsCounter);

        var commentItem = document.createElement('li');
        commentItem.classList.add('social__comment');

        var avatar = document.createElement('img');
        avatar.classList.add('social__picture');
        avatar.src = data.comments[commentsCounter +  i].avatar;
        avatar.width = '35';
        avatar.height = '35';
        avatar.alt = 'Аватар комментатора фотографии';

        var text = document.createElement('p');
        text.classList.add('social__text');
        text.textContent = data.comments[commentsCounter + i].message;
        console.log('выводим коммент');
        commentItem.appendChild(avatar);
        commentItem.appendChild(text);
        comments.appendChild(commentItem);
        commentsCounter++;
      }
      console.log('счетчик комментов после итерации' + commentsCounter);
      commentsInData -= commentsTotalShow;
      console.log('осталось вывести ' + commentsInData);
      if (commentsInData === 0) {
        commentLoader.classList.add('visually-hidden');
        console.log('удаляем кнопку загрузить еще');
      }
    };

    var onCommentLoaderClick = function () {
      setCommentsView(viewData);
    };

    imgView.src = obj.url;
    likes.textContent = obj.likes;
    commentsCount.textContent = obj.comments.length;
    description.textContent = obj.description;
    setCommentsView(viewData);
    commentLoader.addEventListener('click', onCommentLoaderClick);
  };

  var showView = function (data) {
    console.log('очищаем комменты');
    removeComments();
    console.log('делаем видимой кнопку загрузить');
    commentLoader.classList.remove('visually-hidden');
    console.log('показываем окно');
    view.classList.remove('hidden');
    counter.classList.add('visually-hidden');
    console.log('инициализируем картинку');
    setDataView(data);
    console.log('устанавливаем слушатели на закрытие');
    closeButton.addEventListener('click', onViewCloseClick);
    closeButton.addEventListener('keydown', onViewKeydownEnter);
    document.addEventListener('keydown', onViewKeydownEsc);
  };

  var removeComments = function () {
    comments.innerHTML = '';
  };

  var closeView = function () {
    commentsCounter = 0;
    console.log('сбрасываем счетчик комментов');
    removeComments();
    view.classList.add('hidden');
    closeButton.removeEventListener('click', onViewCloseClick);
    closeButton.removeEventListener('keydown', onViewKeydownEnter);
    document.removeEventListener('keydown', onViewKeydownEsc);
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
