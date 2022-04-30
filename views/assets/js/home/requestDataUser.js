

let xhrUser = new XMLHttpRequest();
let user
sendXHRDataUser ()

function sendXHRDataUser () {

  // отправляем POST запрос на '/user'
  xhrUser.open('POST', 'user', false);
  xhrUser.onload = function () {

    if ( xhrUser.status === 200 ) {

      // получаем JSON с путями папок и ID
      user = JSON.parse(xhrUser.responseText)

      for (var i = 0; i < user.folder.length; i++) {

        // убираем первый элкмент (пустой)
        user.folder[i].splice(0, 1)

      }

      handlerFolderFIW ()

    }

  }

  xhrUser.send();

}
