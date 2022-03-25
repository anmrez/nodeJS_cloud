
// Bincan
const bincanIcon = document.querySelectorAll('.bincan__icon')
const bincanLid = document.querySelectorAll('.bincan__lid')

bincanLid.forEach((item, i) => {

  bincanIcon[i].addEventListener('mouseover', function(){
    // console.log(`mouseover`);
    item.style.animationName = 'bincanLid'
  })


  bincanIcon[i].addEventListener('mouseout', function(){
    // console.log(`mouseout`);
    item.style.animationName = 'bincanLidClose'
  })

}); // forEach


// animation context menu 'delete'
const bincanLidContextMeenu = contextmenuDeleteFile.querySelector('.bincan__lid')

  contextmenuDeleteFile.addEventListener('mouseover', function(){
    // console.log(`mouseover`);
    bincanLidContextMeenu.style.animationName = 'bincanLid'
  })

  contextmenuDeleteFile.addEventListener('mouseout', function(){
    bincanLidContextMeenu.style.animationName = 'bincanLidClose'
  })


// animation context menu 'rename'
const renameCursor = contextmenuRenameFile.querySelector('.rename__icon__marker')

  contextmenuRenameFile.addEventListener('mouseover', function(){
    // console.log(`mouseover`);
    renameCursor.style.animationName = 'renameCursor'
    renameCursor.style.animationIterationCount = 'infinite'
  })

  contextmenuRenameFile.addEventListener('mouseout', function(){
    renameCursor.style.animationName = 'renameCursorClose'
    renameCursor.style.animationIterationCount = '1'
  })


// animation context menu 'share'
const shareIconLines = contextmenuShareFile.querySelectorAll('line')
const shareIconCircle1 = contextmenuShareFile.querySelector('.share__icon__circle1')
const shareIconCircle2 = contextmenuShareFile.querySelector('.share__icon__circle2')
const shareIconCircle3 = contextmenuShareFile.querySelector('.share__icon__circle3')

  contextmenuShareFile.addEventListener('mouseover', function(){
    shareIconCircle1.style.animationName = 'shareMouseoverCircle1'
    shareIconCircle2.style.animationName = 'shareMouseoverCircle2'
    shareIconCircle3.style.animationName = 'shareMouseoverCircle3'
    shareIconLines.forEach((item) => {
      item.style.animationName = 'shareMouseoverLine'
    });

  })

  contextmenuShareFile.addEventListener('mouseout', function(){
    shareIconCircle1.style.animationName = 'shareMouseoutCircle1'
    shareIconCircle2.style.animationName = 'shareMouseoutCircle2'
    shareIconCircle3.style.animationName = 'shareMouseoutCircle3'
    shareIconLines.forEach((item) => {
      item.style.animationName = 'shareMouseoutLine'
    });
  })


// animation context menu 'copy'
const copyIconFile1 = contextmenuCopyFile.querySelector('.copy__icon__file1')
const copyIconFile2 = contextmenuCopyFile.querySelector('.copy__icon__file2')

  contextmenuCopyFile.addEventListener('mouseover', function(){
    copyIconFile1.style.animationName = 'copyMouseoverF1'
    copyIconFile2.style.animationName = 'copyMouseoverF2'
  })

  contextmenuCopyFile.addEventListener('mouseout', function(){
    copyIconFile1.style.animationName = 'copyMouseoutF1'
    copyIconFile2.style.animationName = 'copyMouseoutF2'
  })




// --
