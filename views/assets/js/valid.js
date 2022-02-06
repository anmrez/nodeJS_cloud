const inputName = document.getElementById('inputName')
const validName = document.getElementById('validName')
const validPass = document.getElementById('inputPassword')
const error = document.getElementById('symbolError')
const btnSubmit = document.getElementById('submit')
let str, strP
let a = []




checkInput()
inputName.addEventListener("input", function (event) {
  str = inputName.value.toString().split('')
  if (!/[a-zA-Z0-9_]/.test(str[str.length-1])) {
    // console.log(`invalid`);
    btnSubmit.disabled = true  // blocked button "submit"


    // writing a new character to 'a' if there is none
    if (!a.includes(str[str.length-1])) {
      a[a.length] = str[str.length-1]
    }
    forA(a, str) // delete element in "a"

    // displaying an error to the user
    if (a.length) {
      error.innerHTML = `${a}`
      validName.style.display = 'flex'
    }
  } else {
    // console.log(`valid`);
    forA(a, str) // delete element in "a"
    if (a == 0) {
      validName.style.display = 'none'
      checkInput()
    }

  } // if (!/[a-zA-Z0-9_]/


    if (inputName.textLength > 0) {
      inputName.classList.add('active')
    } else {
      inputName.classList.remove('active')
    }
  // console.log(`arr str: '${str}'  || a: '${a}' || a.length: '${a.length}'`);
});

validPass.addEventListener("input", function (event) {
  // if (/\d [A-Z]*[a-zA-Z0-9_]/) {
  strP = validPass.value.toString()
  if (/[A-Z]/.test(strP) && /[0-9]/.test(strP)) {

    console.log(`pass valid`);
  } else {
    console.log(`pass invalid`);
  }


  if (validPass.textLength > 0) {
    validPass.classList.add('active')
  } else {
    validPass.classList.remove('active')
  }
})



// ========
// function

function checkInput() {
  if ( 2 >= inputName.textLength && a == 0) {
    // console.log(inputName.textLength);
    btnSubmit.disabled = true
  } else {
    btnSubmit.disabled = false
  }
} // checkInput()



function forA(a, str) {

  for (var i = -1; i < a.length; i++) {

    if (!str.includes(a[i+1])) { // если элемент из 'А' не найден в строке, тогда удалить эл. из А
      a.splice(i+1, 1)
    } // if

  } // for

} // forA(a, str)
