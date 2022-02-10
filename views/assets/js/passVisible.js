const passwordVisible = document.getElementById('eye')

function passVisible() {
  // console.log(passwordVisible.classList);
  passwordVisible.classList.toggle('active')
  if (passwordVisible.classList.length) {
    inputPass.type = 'text'
  } else {
    inputPass.type = 'password'
  }
}
passwordVisible.addEventListener('click', function () {
  passVisible()
})
