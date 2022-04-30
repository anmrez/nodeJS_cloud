// обьявляем переменные глобвально
let targID,
targIDParr,
nameFile,
targetType

// add evet RMB
document.addEventListener( "contextmenu", function(e) {

  e = e || event;
  e.preventDefault();


  // определяем ИД таргета (если не найдено то присваиваем 'NAN')
  targID = e.target.id || undefined,
  nameFile = e.target.dataset.namefile || undefined,
  targetType = e.target.dataset.type || undefined

  try {

    targIDParr =  e.target.offsetParent.id

  } catch (e) {

    targIDParr = undefined

  }

  console.group('target')
  console.log( `type: ${e.target.dataset.type}` );
  console.log( `name: ${e.target.dataset.namefile}` );
  console.groupEnd()

  // узнаем позиционирование клика
  posX = e.clientX
  posY = e.clientY

  // start if#1: если ПКМ была нажата на область файла или папки
  if ( targetType == 'file' || targetType == 'folder' ) {

    // отобразить все контекстное меню
    contextmenu.childNodes[0].classList.remove('outside')

    // отображаем контекстное меню
    showContextmenu(posX, posY)

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
      showContextmenu(posX, posY)

    } // END if#2

  } // END if#1


  // если клик был сделан не на FIW
  try {

    missClickFIW ( e.target.id, e.target.offsetParent.id )

  } catch (e) {

    fileInteractionWindowHidden()

  }



}); // END addEventListener "contextmenu"


document.addEventListener( "mousedown", function(e) {

  // if#1: add evet LMB
  if ( e.which == 1 ) {

    // try/catch #1
    try {

      // если клик был сделан на контекстное меню
      if ( e.target.id == 'contextmenu' || e.target.offsetParent.id == 'contextmenu' ) {

        // ничего

      // иначе скрыть контекстное меню
      } else {

        contextmenuHide()

      }

    } catch (e) {

      // скрыть контекстное меню
      contextmenuHide()

    } // END try/catch #1


    // если клик был сделан не на FIW
    try {

      missClickFIW ( e.target.id, e.target.offsetParent.id )

    } catch (e) {

      fileInteractionWindowHidden()

    }


  } // END if#1

}) // END addEventListener "mousedown"



// скрыть FIW при промахе
function missClickFIW ( target1, target2 ) {

  if ( target1 == 'fileInteractionWindow' || target2 == 'fileInteractionWindow' ) {

    // скрыть контекстное меню при клике на FIW
    contextmenuHide()

  } else {

    // скрыть FIW
    fileInteractionWindowHidden()

  }

}
