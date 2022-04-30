// скрывает форму управления файлом
function fileInteractionWindowHidden(){

  // скрываеим форму
  managementForm.classList.remove('active')

  // сворачиваем вложенности папок ('move'/'copy')
  hideFolderLevels ( 0 )
  const folder = managementForm.querySelector('#FIWFolder')
  const mainFolder = folder.childNodes[0]
  mainFolder.classList.remove('active')

  // удаляем обрабтчики на кнопки закрытия
  const btnCancel = document.querySelectorAll('#cancel')
  btnCancel.forEach((item) => {

    item.removeEventListener( 'click', closeFIWBtn )

  });

  // удаляем обработчик на кнопку копирования
  const btnCopyLicn = managementForm.querySelector('#copyLinc')
  btnCopyLicn.removeEventListener( 'click', copyLincShare )

}


// показывает форму управления файлом
function fileInteractionWindowShow( newTitle, nameFile, additional){

  // скрыть контекстное меню
  contextmenuHide()

  //показываем форму
  managementForm.classList.add('active')

  // обрабатываем назыание операции
  const name = document.querySelector('#nameOperation')
  name.value = newTitle

  // обрабатываем заголовок формы
  const title = managementForm.querySelector('#FIWTitle')
  title.innerHTML = newTitle

  // обрабатываем форму с новым название
  const input = managementForm.querySelector('#newNameFile')
  input.value = nameFile

  if ( additional == true ) {

    // обрабатываем форму со старым названием
    const oldName = managementForm.querySelector('#oldNameFile')
    oldName.value = nameFile

  }


  // вешаем обрабтчики на кнопки закрытия
  const btnCancel = document.querySelectorAll('#cancel')
  btnCancel.forEach((item) => {

    item.addEventListener( 'click', closeFIWBtn )

  });


}


// доваление/удаление слушателя на кнопки удаления
function closeFIWBtn () {

  fileInteractionWindowHidden()

}


// копирование ссылки 'SHARE'
function copyLincShare () {

  const input = managementForm.querySelector('#newNameFile')
  const status = managementForm.querySelector('#statusCopy')
  // const pageLogs = document.querySelector('#pageLogs')

  // копирование ссылки в буфер обмена
  if ( navigator.clipboard ){

    navigator.clipboard.writeText( input.value )
    .then(() => {
      // текст сохранен в буффер
      status.classList.remove('err')
      status.classList.add('success')
      removeStatus ( status )

    }) // END then
    .catch(err => {
      // если ошибка
      console.log('Something went wrong', err);
      status.classList.remove('success')
      status.classList.add( 'err' )
      removeStatus ( status )
      // pageLogs.innerHTML = 'текст не скопирован (clipboard)'
    });

  } else {

    try {

      // выделить содержимое инпута
      input.select()
      // скопировать выделенный текст в буффер обмена
      document.execCommand('copy')
      status.classList.remove('err')
      status.classList.add('success')
      removeStatus ( status )
      // pageLogs.innerHTML = 'текст скопирован (execCommand)'

    } catch (e) {

      console.log(e);
      status.classList.remove('success')
      status.classList.add('err')
      removeStatus ( status )
      // pageLogs.innerHTML = 'текст не скопирован (execCommand)'

    }

  } // END if navigator.clipboard

}


function removeStatus ( status ) {

  setTimeout(
    removeStatus2,
    1500,
    status
  )

}


function removeStatus2 ( status ){

  status.classList.remove('success')
  status.classList.remove('err')

}


function handlerSHareFIWContent( param ) {

  // param == share/submit
  // отображение кнопок 'save' и 'copy link'
  displayButtonsFIW ( param )
  // выделение инпута при фокусе
  handlerFocus( param )

}


// отображение кнопок 'save' и 'copy link'
function displayButtonsFIW ( param ) {

  const submit = managementForm.querySelector('#inputSubmit')

  // param == share/submit
  if ( param == 'share' ) {

    submit.classList.add('none')
    copyLinc.classList.remove('none')

  } else {

    submit.classList.remove('none')
    copyLinc.classList.add('none')

  }

}


// выделение содержимого инпута при фокусе
function handlerFocus( param ) {

  // param == share/submit
  const input = newNameFile

  if ( param == 'share' ) {

    // выделение всего инпута
    input.onfocus = function(){

      input.selectionStart = 0
      input.selectionEnd = input.value.length
    }

  } else {

    // выделение до точки
    input.onfocus = function(){
      input.selectionStart = 0
      input.selectionEnd = input.value.indexOf('.')
    }

  }

}


function displayNewName ( param ) {

  const input = managementForm.querySelector('#newNameFile')

  if ( param == 'move' ) {

    input.classList.add('none')

  } else {

    input.classList.remove('none')

  }

}


// показывает/скрыват вложенности папок в FIW
function visibleFoldersLevels( param ) {

  // param == true/false
  const folder = managementForm.querySelector('#FIWFolder')
  const content = managementForm.querySelector('.FIW__content')

  if ( param ) {

    folder.classList.remove('none')
    content.style.flexDirection = `column`

  } else {

    folder.classList.add('none')
    content.style.flexDirection = `row`

  }

}
