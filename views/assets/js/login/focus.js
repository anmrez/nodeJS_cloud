const inputRemem = document.querySelector('#rememberUser')
const borderRemem = document.querySelector('#sectionInputCheckbox')


inputRemem.addEventListener('focus', function(){
  borderRemem.classList.add('active')
}) // END 'focus'

inputRemem.addEventListener('blur', function(){
  borderRemem.classList.remove('active')
}) // END 'blur'

document.addEventListener('keydown', function(){
  if ( event.keyCode == 13 && borderRemem.classList[2] == 'active' ) {
    if ( rememberUser.checked ) {
      rememberUser.checked = false
    } else {
      rememberUser.checked = true
    }
  }

}) // END 'keydown'
