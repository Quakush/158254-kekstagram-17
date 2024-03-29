'use strict';

(function () {
  var TIMEOUT = 5000;
  var SUCCESS_CODE = 200;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var request = function (type, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(type, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      request('GET', URL_LOAD, onSuccess, onError);
    },
    save: function (data, onSuccess, onError) {
      request('POST', URL_SAVE, onSuccess, onError, data);
    }
  };
})();
