
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
