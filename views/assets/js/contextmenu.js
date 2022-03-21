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

  posX = e.clientX
  posY = e.clientY

  // console.log(`______`);
  // console.log(`right click`);
  // console.log(e.explicitOriginalTarget);
  // console.log(posX);
  // console.log(posY);


  // try/catch #1
  try {
    // console.log( e.target.id );
    // console.log( e.target.offsetParent.id );

    // если клик был сделан на контекстное меню
    if ( e.target.id == 'contextmenu' || e.target.offsetParent.id == 'contextmenu' ) {
      // console.log(`clicked context menu`);
    } else {
      contextmenuShow(posX, posY)
    }

  } catch (e) {
    contextmenuShow(posX, posY)
  } // END try/catch #1

});


document.addEventListener( "mousedown", function(e) {
  // if#1: add evet LMB
  if ( e.which == 1 ) {
    // console.log(`______`);
    // console.log(`left click`);

    // try/catch #1
    try {
      // console.log(e.target.id);
      // console.log(e.target.offsetParent.id);

      // если клик был сделан на контекстное меню
      if ( e.target.id == 'contextmenu' || e.target.offsetParent.id == 'contextmenu' ) {
      } else {
        contextmenuHide()
      }

    } catch (e) {
      contextmenuHide()
    } // END try/catch #1

  } // END if#1



}) // event mousedown


// === END EventListener ===
