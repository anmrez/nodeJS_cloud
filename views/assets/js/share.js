const shareBtn = document.querySelectorAll('.shareButton')
const shareLink = document.querySelectorAll('.share__link')
const url = document.URL
const spanCopyLink = document.querySelectorAll('.link__copied')


shareBtn.forEach((item, i) => {
  // edit link
  shareLink[i].defaultValue = url + shareLink[i].defaultValue
  item.addEventListener('click', function(){

    try {
      // save link in clipboard
      navigator.clipboard.writeText(shareLink[i].defaultValue)
      // start animation "link copied"
      spanCopyLink[i].style.animationName = 'linkCopied'
      // stop animation "link copied"
      setTimeout(deleteAnim, 3000, i)

    } catch (e) {
      console.log(e);
      // visible link
      shareLink[i].classList.toggle('active')
    } // try/catch


  }) // addEvent
}); // forEach


function deleteAnim(i){
  spanCopyLink[i].style.animationName = ''
}
