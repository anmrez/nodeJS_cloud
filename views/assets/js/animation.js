
// Bincan
const bincanIcon = document.querySelectorAll('.bincan__icon')
const bincanLid = document.querySelectorAll('.bincan__lid')

bincanLid.forEach((item, i) => {

  bincanIcon[i].addEventListener('mouseover', function(){
    console.log(`mouseover`);
    item.style.animationName = 'bincanLid'
  })


  bincanIcon[i].addEventListener('mouseout', function(){
    console.log(`mouseout`);
    item.style.animationName = 'bincanLidClose'
  })

}); // forEach


// --
