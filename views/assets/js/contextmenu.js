const contextmenu = document.querySelector('#contextmenu')
const contextmenuNewFolder = document.querySelector('#contextmenuNewFolder')
const contextmenuUploadFile = document.querySelector('#contextmenuUploadFile')
const contextmenuRenameFile = document.querySelector('#contextmenuRenameFile')
const contextmenuDownloadFile = document.querySelector('#contextmenuDownloadFile')
const contextmenuShareFile = document.querySelector('#contextmenuShareFile')
const contextmenuCopyFile = document.querySelector('#contextmenuCopyFile')
const contextmenuDeleteFile = document.querySelector('#contextmenuDeleteFile')
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
  const title = managementForm.querySelector('#FMFTitle')
  title.innerHTML = newTitle

  // обрабатываем форму с новым название
  const input = managementForm.querySelector('#newNameFile')
  input.value = nameFile

  if ( additional == true ) {
    // обрабатываем форму со старым названием
    const oldName = managementForm.querySelector('#oldNameFile')
    oldName.value = nameFile
  }

  // обрабатываем кнопку
  const submit = managementForm.querySelector('#inputSubmit')
  const copyLinc = managementForm.querySelector('#copyLinc')

  // если заголовок равен поделиться
  if ( newTitle == 'Share' ) {

    // скрываем кнопку отправки формы
    submit.classList.add('none')
    // плказываем кнопку копирования формы
    copyLinc.classList.remove('none')
    // делайм форму только для чтения
    input.readOnly = true

  } else {

    submit.classList.remove('none')
    copyLinc.classList.add('none')
    input.readOnly = false

    const status = managementForm.querySelector('#statusCopy')
    status.classList.remove('err')
    status.classList.remove('success')

  } // END 'share'


} // END fileInteractionWindowShow


// === END function ===
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
  let targID, targIDParr, targClass, targClassparent, nameFile
  try {
    targClass = e.target.classList[0]
    targClassparent = e.target.offsetParent.classList[0]
    targID = e.target.id
    targIDParr =  e.target.offsetParent.id
    targChildNodes = e.target.lastChild.childNodes
    nameFile = e.target.querySelector('.file__name').innerHTML
  } catch (e) {
    targClass = 'undefined'
    targClassparent = 'undefined'
    targID = 'undefined'
    targIDParr = 'undefined'
    targChildNodes = 'undefined'
    nameFile = 'undefined'
  }
  // console.log( targChildNodes );

  // узнаем позиционирование клика
  posX = e.clientX
  posY = e.clientY

  // проверка на файл
  let targetFile = []
  targetFile[0] = targClass == 'folder__link' || targClass == 'view__files'
  targetFile[1] = targClassparent == 'folder__link' || targClassparent == 'view__files'

  // start if#1: если ПКМ была нажата на область файла
  if ( targetFile[0] || targetFile[1] ) {

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

      // показать часть контекстного меню
      contextmenu.childNodes[0].classList.add('outside')

      // отображаем контекстное меню
      contextmenuShow(posX, posY)

    } // END if#2

  } // END if#1


  // handler 'rename'
  contextmenuRenameFile.addEventListener('click', function(){
    fileInteractionWindowShow( 'Rename', nameFile, true )
  }, { once: true })


  // handler 'download'
  contextmenuDownloadFile.addEventListener('click', function(){
    targChildNodes[0].click()
  }, { once: true })

  // handler 'share'
  contextmenuShareFile.addEventListener('click', function(){
    fileInteractionWindowShow( 'Share', targChildNodes[2].value, false )
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
      // console.log(e.target.id);
      // console.log(e.target.offsetParent.id);

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


// доваляем прослушиватели на кнопки отмена
btnCancel.forEach((item) => {
  item.addEventListener('click', function(){
    fileInteractionWindowHidden()
  })
});


// добавляем прослушиватель на кнопку "копирование ссылки"

btnCopyLicn.addEventListener('click', copyLincShare)
btnCopyLicn.addEventListener('Touch', copyLincShare)



function copyLincShare(){
  const input = managementForm.querySelector('#newNameFile')
  const status = managementForm.querySelector('#statusCopy')

  // копирование ссылки в буфер обмена
    if ( navigator.clipboard ){
      navigator.clipboard.writeText( input.value )
      .then(() => {
        // текст сохранен в буффер
        status.classList.remove('err')
        status.classList.add('success')
        pagelogs.innerHTML = input.value
      })
      .catch(err => {
        // если ошибка
        console.log('Something went wrong', err);
        status.classList.remove('success')
        status.classList.add('err')
        pagelogs.innerHTML = err
      });

    } else {
      // выделить текст

      try {
        // скопировать выделенный текст в буффер обмена
        document.execCommand('copy')
        status.classList.remove('err')
        status.classList.add('success')
      } catch (e) {
        console.log(e);
        status.classList.remove('success')
        status.classList.add('err')
      }

    } // END if navigator.clipboard
  } // END copyLincShare()



// === END EventListener ===
