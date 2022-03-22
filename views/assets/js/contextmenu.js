const contextmenu = document.querySelector('#contextmenu')
let windowInnerWidth = window.innerWidth
let windowInnerHeight = window.innerHeight

console.log(contextmenu);

// === function ===


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

function contextmenuHide(){
  contextmenu.style.opacity = `0`
  contextmenu.style.pointerEvents = 'none'
}

function contextmenuHandler() {

  // new folder

  // upload file
  let uploadFile = document.querySelector('#contextmenuChooseFile')
  uploadFile.addEventListener('click', function(){
    input_files.click()
  })

}

// let  = document.querySelector('#')
// .addEventListener('click', function(){
  //
  // })

function contextmenuHandlerFile( childNodes ) {

  // rename
  let renameFile = document.querySelector('#contextmenuRenameFile')

  // download
  let downloadFile = document.querySelector('#contextmenuDownloadFile')
  downloadFile.addEventListener('click', function(){
    childNodes[0].click()
  })

  // share

  // copy

  // delete
  let deleteFile = document.querySelector('#contextmenuDeleteFile')
  deleteFile.addEventListener('click', function(){
    childNodes[3].click()
  })

}

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

  // определяем ИД таргета (если не найдено то присваиваем 'NAN')
  let targID, targIDParr, targClass, targClassparent
  try {
    targClass = e.target.classList[0]
    targClassparent = e.target.offsetParent.classList[0]
    targID = e.target.id
    targIDParr =  e.target.offsetParent.id
    targChildNodes = e.target.lastChild.childNodes
  } catch (e) {
    targClass = 'undefined'
    targClassparent = 'undefined'
    targID = 'undefined'
    targIDParr = 'undefined'
    targChildNodes = 'undefined'
  }

  console.log(targChildNodes);

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

    // связывает управление с файлом
    contextmenuHandlerFile( targChildNodes )

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


// === END EventListener ===
