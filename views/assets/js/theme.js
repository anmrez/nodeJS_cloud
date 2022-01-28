let darkTheme = document.querySelectorAll('.theme__dark')
let lightTheme = document.querySelectorAll('.theme__light')
// console.log(darkTheme);
// console.log(lightTheme);

document.addEventListener('onload', checkTheme())

function checkTheme() {
  let theCookies = document.cookie.split('; ');
  theCookies.forEach( i => {
    if (i == `theme=light`) {
      changeOfSubject()
    }
  });
}



function changeOfSubject(){
  let checkBox;
  checkBox = document.getElementById('checkBoxTheme')
  checkBox.classList.toggle('active')

  // смена темы
  if (checkBox.classList.value == "check__box active") {
    darkTheme.forEach( i => {
      i.classList.remove('theme__dark')
      i.classList.add('theme__light')
      document.cookie = `theme=light; maxAge=1000*60*60*24*31; samesite=strict`
    });
  } else {
    darkTheme.forEach( i => {
      i.classList.remove('theme__light')
      i.classList.add('theme__dark')
      document.cookie = `theme=light; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict`
    });
  }
} // END changeOfSubject()
