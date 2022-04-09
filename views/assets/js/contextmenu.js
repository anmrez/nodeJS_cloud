const contextmenu = document.querySelector('#contextmenu')

const contextmenuNewFolder = document.querySelector('#contextmenuNewFolder') // new folder
const contextmenuUploadFile = document.querySelector('#contextmenuUploadFile') // upload
const contextmenuRenameFile = document.querySelector('#contextmenuRenameFile') // rename
const contextmenuDownloadFile = document.querySelector('#contextmenuDownloadFile') // download
const contextmenuShareFile = document.querySelector('#contextmenuShareFile') // share
const contextmenuCopyFile = document.querySelector('#contextmenuCopyFile') // copy
const contextmenuDeleteFile = document.querySelector('#contextmenuDeleteFile') // delete
const contextmenuMoveFile = document.querySelector('#contextmenuMoveFile') // move

const managementForm = document.querySelector('#fileInteractionWindow')

const btnCancel = document.querySelectorAll('#cancel')
const btnCopyLicn = managementForm.querySelector('#copyLinc')

let windowInnerWidth = window.innerWidth
let windowInnerHeight = window.innerHeight

console.log(contextmenu);

// === function ===


// показать контекстное меню
function contextmenuShow(posX, posY){
  // если контекстное меню выходит за экран
  if ( windowInnerHeight <= posY + contextmenu.offsetHeight) {
    contextmenu.style.top = `${posY - contextmenu.offsetHeight}px`
  } else {
    contextmenu.style.top = `${posY}px`
  }

  if (windowInnerWidth <= posX + contextmenu.offsetWidth) {
    contextmenu.style.left = `${posX - contextmenu.offsetWidth}px`
  } else {
    contextmenu.style.left = `${posX}px`
  }

  contextmenu.style.opacity = `1`
  contextmenu.style.pointerEvents = 'auto'

}


// скрыть контекстное меню
function contextmenuHide(){
  contextmenu.style.opacity = `0`
  contextmenu.style.pointerEvents = 'none'
}


// базовый обработчик контекстного меню (новая папка и загрузка файлов)
function contextmenuHandler() {

  // new folder
  contextmenuNewFolder.addEventListener('click', function(){
    fileInteractionWindowShow( 'Create new folder', 'New folder', false )
  })

  // upload file
  contextmenuUploadFile.addEventListener('click', function(){
    input_files.click()
  })

}


// скрывает форму управления файлом
function fileInteractionWindowHidden(){
  // скрываеим форму
  managementForm.classList.remove('active')
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


// SHARE ==========================================

  // обрабатываем кнопки
  const submit = managementForm.querySelector('#inputSubmit')
  const copyLinc = managementForm.querySelector('#copyLinc')

  // если заголовок 'SHARE'
  if ( newTitle == 'Share' ) {

    // скрываем кнопку отправки формы
    submit.classList.add('none')
    // показываем кнопку копирования формы
    copyLinc.classList.remove('none')
    // делайм форму только для чтения
    input.readOnly = true

    // прослушиватель при фокусе: выделяет весь текст
    input.onfocus = function(){
      input.selectionStart = 0
      input.selectionEnd = input.value.length
    }

    // если заголовок НЕ 'SHARE'
  } else {

    // показать кнопку отправки формы
    submit.classList.remove('none')
    // убрать кнопку копирования ссылки
    copyLinc.classList.add('none')
    // сделать инпут изменяемым
    input.readOnly = false

    // убрать состояния статуса
    const status = managementForm.querySelector('#statusCopy')
    status.classList.remove('err')
    status.classList.remove('success')

    // прослушиватель при фокусе: выделяет текст до точки
    input.onfocus = function(){
      input.selectionStart = 0
      input.selectionEnd = input.value.indexOf('.')
    }

  } // END 'share'

// END 'share' ==========================================
// Copy and move ==========================================

  const content = managementForm.querySelector('.FIW__content')
  const folder = managementForm.querySelector('#FIWFolder')
  if ( newTitle == 'Copy' || newTitle == 'Move' ) {
    console.log(`title copy`);
    // показываем список папок куда можно скопировать файл
    folder.classList.remove('none')
    content.style.flexDirection = `column`
  } else {

    // скрываем список папок
    folder.classList.add('none')
    content.style.flexDirection = `row`
  }

  // move: скрываем перетаскиваемую папку от самой себя
  const folderChild = folder.childNodes
  const foldersList = []

  // если заголовок 'move'
  if ( newTitle == 'Move' ) {

    // проходимся по списку папок
    folderChild.forEach((item, i) => {

      // записываем в массив имена папок
      foldersList[i] = item.dataset.folder

      // если папка == названию перетаскиваемой папки
      if ( foldersList[i] == nameFile ){

        // скрываем ее
        item.classList.add('none')

      } else {

        // показываем ее
        item.classList.remove('none')

      } // END foldersList[i] == nameFile

    }); // END forEach

  // если заголовок не 'move'
  } else {

    // проходимся по списку папок
    folderChild.forEach((item, i) => {

      // показываем все папки
      item.classList.remove('none')

    }); // END forEach

  } // END newTitle == 'Move'



  // END Copy and move ==========================================




} // END fileInteractionWindowShow


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
      // pageLogs.innerHTML = 'текст скопирован (clipboard)'
    })
    .catch(err => {
      // если ошибка
      console.log('Something went wrong', err);
      status.classList.remove('success')
      status.classList.add('err')
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
      // pageLogs.innerHTML = 'текст скопирован (execCommand)'
    } catch (e) {
      console.log(e);
      status.classList.remove('success')
      status.classList.add('err')
      // pageLogs.innerHTML = 'текст не скопирован (execCommand)'
    }

  } // END if navigator.clipboard
} // END copyLincShare()


// обрабатываем вложенности папок в ферме
function handlerFolderFIW () {
  const folder = managementForm.querySelector('#FIWFolder')
  const folderPath = user.folder
  const mainFolder = folder.childNodes[0]
  console.log(user);
  console.log(mainFolder);

  let j = 0
  let length = 1
  let newFolder
  for (var i = 0; i < folderPath.length; i++) {
    // console.log(`i: ${i}; j:${j}`);
    // console.log( folderPath[i].length );
    // console.log( length );
    if ( folderPath[i].length == length ) {
      newFolder = mainFolder.cloneNode(true)
      newFolder.innerHTML = folderPath[i][j]
      newFolder.dataset.folder = folderPath[i]
      newFolder.dataset.link = '/' + folderPath[i]
      newFolder.dataset.length = length
      folder.append(newFolder)
    }

  }
  // user[i][j]

} // END handlerFolderFIW()

// === END function ====
// =====================
// === EventListener ===



// add event resize window
window.addEventListener('resize', function(event) {
  windowInnerWidth = window.innerWidth
  windowInnerHeight = window.innerHeight
  // console.log(windowInnerWidth + '; ' + windowInnerHeight);
}, true);


// add evet RMB
document.addEventListener( "contextmenu", function(e) {
  e = e || event;
  e.preventDefault();

  // бфзовый обработчик (создание папки и загрузка фалов)
  contextmenuHandler()
  console.log(`______`);
  // console.log(e.target);

  // определяем ИД таргета (если не найдено то присваиваем 'NAN')
  let targID,
  targIDParr,
  targClass,
  targClassparent,
  nameFile,
  targChildNodes,
  targetType

  targetType = e.target.dataset.type || 'undefined'
  nameFile = e.target.dataset.namefile || 'undefined'
  targClass = e.target.classList[0] || 'undefined'
  targClassparent = e.target.offsetParent.classList[0] || 'undefined'
  targID = e.target.id || 'undefined'
  targIDParr =  e.target.offsetParent.id || 'undefined'

  try {
    if ( targetType == 'folde') {
      targChildNodes = e.target.nextSibling.childNodes
    } else {
      targChildNodes = e.target.lastChild.childNodes
    }
  } catch (e) {
    targChildNodes = 'undefined'
  }


  console.log( `type: ${e.target.dataset.type}` );
  console.log( `name: ${e.target.dataset.namefile}` );
  // console.log( `child:` ); console.log( targChildNodes );
  // console.log(e.target.nextSibling.childNodes);

  // узнаем позиционирование клика
  posX = e.clientX
  posY = e.clientY

  // start if#1: если ПКМ была нажата на область файла или папки
  if ( targetType == 'file' || targetType == 'folder' ) {

    // отобразить все контекстное меню
    contextmenu.childNodes[0].classList.remove('outside')

    // отображаем контекстное меню
    contextmenuShow(posX, posY)

  // if#1: если ПКМ была нажата вне файла
  } else {


    // start if#2: если клик был сделан на контекстное меню
    if ( targID == 'contextmenu' || targIDParr == 'contextmenu' ) {

      // ничего не происходит

    // if#2: если клик был здеан НЕ `на файл` и НЕ `на контекстное меню`
    } else {

      // показать базовую часть контекстного меню
      contextmenu.childNodes[0].classList.add('outside')

      // отображаем контекстное меню
      contextmenuShow(posX, posY)

    } // END if#2

  } // END if#1


  // handler 'rename'
  contextmenuRenameFile.addEventListener('click', function(){
    console.log(`rename: ${nameFile}`);
    fileInteractionWindowShow( 'Rename', nameFile, true )
  }, { once: true })

  // handler 'Move'


  contextmenuMoveFile.addEventListener('click', function(){
    fileInteractionWindowShow( 'Move', nameFile, false )
    // targChildNodes[2].value
  }, { once: true })



  // handler 'download'
  contextmenuDownloadFile.addEventListener('click', function(){
    targChildNodes[0].click()
  }, { once: true })

  // handler 'share'
  contextmenuShareFile.addEventListener('click', function(){
    fileInteractionWindowShow( 'Share', targChildNodes[2].value, false )
  }, { once: true })

  // handler 'Copy'
  contextmenuCopyFile.addEventListener('click', function(){
    fileInteractionWindowShow( 'Copy', nameFile, false )
    // targChildNodes[2].value
  }, { once: true })

  // handler 'delete'
  contextmenuDeleteFile.addEventListener('click', function(){
    targChildNodes[3].click()
  }, { once: true })


}); // END addEventListener "contextmenu"


document.addEventListener( "mousedown", function(e) {
  // if#1: add evet LMB
  if ( e.which == 1 ) {

    // try/catch #1
    try {

      // если клик был сделан на контекстное меню
      if ( e.target.id == 'contextmenu' || e.target.offsetParent.id == 'contextmenu' ) {

        // ничего

      } else {

        // иначе скрыть контекстное меню
        contextmenuHide()

      }

    } catch (e) {

      // скрыть контекстное меню
      contextmenuHide()

    } // END try/catch #1

  } // END if#1



}) // END addEventListener "mousedown"


// доваляем прослушиватели на кнопки отмены в FIW
btnCancel.forEach((item) => {
  item.addEventListener('click', function(){
    fileInteractionWindowHidden()
  })
});

// добавляем прослушиватель на кнопку "копирование ссылки"
btnCopyLicn.addEventListener('click', copyLincShare)


// btnCopyLicn.addEventListener('Touch', copyLincShare)




// === END EventListener ===
