// обработчики кнопок в КМ

function createFolderHandler () {

  displayNewName ( 'nomove' )
  // присваиваем имя файла
  const input = managementForm.querySelector('#oldNameFile')
  input.value = nameFile

  handlerSHareFIWContent( 'submit' )
  fileInteractionWindowShow( 'Create new folder', 'New folder', true )
  visibleFoldersLevels( false )

}


function uploadHandler () {

  input_files.click()

}


function renameHandler () {

  displayNewName ( 'nomove' )
  handlerSHareFIWContent( 'submit' )
  fileInteractionWindowShow( 'Rename', nameFile, true )
  visibleFoldersLevels( false )


}


function moveHandler () {

  displayNewName ( 'move' )
  handlerSHareFIWContent( 'submit' )
  fileInteractionWindowShow( 'Move', nameFile, false )
  visibleFoldersLevels( true )

}


function downloadHandler () {

  displayNewName ( 'nomove' )
  // меняем название операции
  const name = document.querySelector('#nameOperation')
  name.value = 'Download'

  // присваиваем имя файла
  const input = managementForm.querySelector('#oldNameFile')
  input.value = nameFile

  // отменям заврос для смены типа отправки
  xhrFIW.abort();
  xhrFIW.responseType = "blob"

  // отправляем запрос
  requestHandler ()

  xhrFIW.onload = function() {

    if ( xhrFIW.status === 200 ) {

      linkSownloadFile.download = nameFile
      linkSownloadFile.href = URL.createObjectURL( xhrFIW.response );
      linkSownloadFile.click();

    }

  };

}


function shareHandler () {

  displayNewName ( 'nomove' )
  // генерация ссылки
  let href = location.origin
  href += `/download?file=${nameFile}`
  href += `&id=${user.id}`

  let path = location.search.split('?')[1]

  // если находимся в папке
  if ( path !== undefined ) {

    href += `&${ path }`

  }

  handlerSHareFIWContent( 'share' )
  fileInteractionWindowShow( 'Share', href, false )
  visibleFoldersLevels( false )

  // вешаем слушатель на кнопку копирования
  const btnCopyLicn = managementForm.querySelector('#copyLinc')
  btnCopyLicn.addEventListener( 'click', copyLincShare )

}


function copyHandler () {

  displayNewName ( 'nomove' )
  handlerSHareFIWContent( 'submit' )
  fileInteractionWindowShow( 'Copy', nameFile, false )
  visibleFoldersLevels( true )

}


function deleteHandler () {

  displayNewName ( 'nomove' )
  // меняем название операции
  const name = document.querySelector('#nameOperation')
  name.value = 'Delete'

  // присваиваем имя файла
  const input = managementForm.querySelector('#oldNameFile')
  input.value = nameFile

  // отправляем запрос
  requestHandler ()

}

// обработчики кнопок в КМ
