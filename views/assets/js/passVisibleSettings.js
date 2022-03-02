const eyes = document.querySelectorAll(".eye")
const inpunts = document.querySelectorAll(".inputsPassword")


eyes.forEach((item, i) => {
  item.addEventListener('click', function () {
    passVisible(item, i)
  })
});



function passVisible(item, i) {
  // console.log(passwordVisible.classList);
  item.classList.toggle('active')
  if (item.classList.length == 2) {
    inpunts[i].type = 'text'
  } else {
    inpunts[i].type = 'password'
  }
}
