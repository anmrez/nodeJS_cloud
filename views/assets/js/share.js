addFunctionalShare()
function addFunctionalShare() {

  const shareBtn = document.querySelectorAll('.shareButton')
  const shareLink = document.querySelectorAll('.share__link')
  const url = location.origin
  const spanCopyLink = document.querySelectorAll('.link__copied')
  const checkShareLinc = new RegExp(url);
  shareBtn.forEach((item, i) => {
    // edit link

    // add address if missing
    if (  shareLink[i].defaultValue.match(checkShareLinc) == null  ) {
      shareLink[i].defaultValue = url+ '/' + shareLink[i].defaultValue
    }
    // add anim
    item.addEventListener('click', function(){

      try {
        // save link in clipboard
        navigator.clipboard.writeText(shareLink[i].defaultValue)
        // start animation "link copied"
        spanCopyLink[i].style.animationName = 'linkCopied'
        // stop animation "link copied"
        setTimeout(deleteAnimShare, 3000, i, spanCopyLink)

      } catch (e) {
        console.log(e);
        // visible link
        shareLink[i].classList.toggle('active')
      } // try/catch


    }) // addEvent
  }); // forEach

}

function deleteAnimShare(i, spanCopyLink){
  spanCopyLink[i].style.animationName = ''
}
