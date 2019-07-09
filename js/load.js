'use strict';

(function () {
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/kekstagram/data';

    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.open('GET', URL);
    xhr.send();
  };

  window.save(data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
