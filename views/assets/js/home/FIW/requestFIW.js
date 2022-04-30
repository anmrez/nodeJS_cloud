// отправка формы на сервер
let xhrFIW = new XMLHttpRequest();
xhrFIW.overrideMimeType( "multipart/form-data" )
// xhrFIW.responseType = "blob"
xhrFIW.responseType = 'json'
const linkSownloadFile = document.createElement('a');

function requestHandler () {

  formFIW = new FormData(document.querySelector('#fileInteractionWindow'));
  // добавляем текущий путь в форму
  formFIW.append("path", location.search.split('=')[1] || '/');
  xhrFIW.open('POST', '/', true);
  xhrFIW.send( formFIW );

  xhrFIW.onload = function() {

    if ( xhrFIW.status === 200 ) {

      setTimeout( fileInteractionWindowHidden, 500 )

    } else {

      // бработка ошибок
      setTimeout( fileInteractionWindowHidden, 500 )

    }

    // если тип 'blob' меняем на 'json'
    if ( xhrFIW.responseType == 'blob' ) {

      // отменям заврос для смены типа отправки
      xhrFIW.abort();
      xhrFIW.responseType = 'json'

    }

    const name = document.querySelector('#nameOperation').value

    // если изменения на сервере успешны
    if ( xhrFIW.response == 'success' ) {

      if ( name == 'Rename' ) {

        responseRename ()

      }

      if ( name == 'Create new folder' ) {

        createFolder ()

      };

      if ( name == 'Delete' ) {

        responseDelete ()

      }

      // restart xhrUser
      xhrUser.abort()
      sendXHRDataUser ()

    // END xhrFIW.response == 'success'
    };

  };


  function responseRename () {

    // присваиваем имя файла
    const oldName = managementForm.querySelector('#oldNameFile').value
    const newName = managementForm.querySelector('#newNameFile').value

    // ищем файл в котором меняли имя
    let file = document.querySelectorAll( `[data-nameFile = '${ oldName }']` )[0]

    // изменяем старые имена на новые
    file.dataset.namefile = newName
    let nameFile = file.querySelector('.file__name')
    nameFile.innerHTML = newName

  }

  function createFolder () {

  const newName = managementForm.querySelector('#newNameFile').value

  const folder = document.createElement( 'li' )
  folder.classList.add( 'view__files' )

  const span = document.createElement( 'span' )
  span.classList.add( 'file__name' )
  span.innerHTML = newName
  folder.append( span )

  const a = document.createElement( 'a' )
  a.classList.add( 'folder__link' )
  a.href = `?path=${newName}`
  if ( location.search > '' ) a.href = location.search + '/' + newName
  a.setAttribute( 'data-type', 'folder' )
  a.setAttribute( 'data-namefile', newName )
  folder.append( a )

  const chooseBtn = document.querySelector('#menuChoose')
  chooseBtn.before( folder )

}

  function responseDelete () {

    const oldName = managementForm.querySelector('#oldNameFile').value
    // ищем файл который удаляем
    let file = document.querySelectorAll( `[data-nameFile = '${ oldName }']` )[0]
    if ( file.dataset.type == 'folder' ) file = file.offsetParent
    file.remove()

  }

};
