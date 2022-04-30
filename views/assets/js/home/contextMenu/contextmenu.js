// const contextmenu = document.querySelector('#contextmenu')
const managementForm = document.querySelector('#fileInteractionWindow')

let windowInnerWidth = window.innerWidth
let windowInnerHeight = window.innerHeight

let posX, posY


// === function ===


// показать контекстное меню
function showContextmenu(posX, posY){

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


// === END function ====
// =====================
// === EventListener ===


// add event resize window
window.addEventListener('resize', function(event) {

  windowInnerWidth = window.innerWidth
  windowInnerHeight = window.innerHeight
  // console.log(windowInnerWidth + '; ' + windowInnerHeight);

}, true);




// === END EventListener ===
