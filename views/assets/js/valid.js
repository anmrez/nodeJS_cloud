const inputName = document.getElementById('inputName')
const inputPass = document.getElementById('inputPassword')
const validName = document.getElementById('validName')
const validPass = document.getElementById('validPass')
const errorNameElement = document.getElementById('symbolErrorName')
const errorPassElement = document.getElementById('symbolErrorPass')
const btnSubmit = document.getElementById('submit')
let str = ``,
  strP = ``
let errorName = []
let errorPass = []
let nameBoolean, passBoolean


checkInput()
inputName.addEventListener("input", function (event) {
  str = inputName.value.toString().split('')
  if (!/[a-zA-Z0-9_]/.test(str[str.length-1])) {
    nameBoolean = false
    if (!errorName.includes(str[str.length-1])) {
      errorName[errorName.length] = str[str.length-1]
      nameBoolean = false
      checkInput()
    }
    forA(errorName, str) // delete element in "a"

    checkInput()
  } else {
    nameBoolean = true
    forA(errorName, str)
    if (errorName == 0) {
      validName.style.display = 'none'
    }
    checkInput()
  } // if (!/[a-zA-Z0-9_]/

    checkArrErr(errorName, errorNameElement, validName) // Отображение неверных символов пользователю пользователю
    showError(inputName) // отображение ошибки пользователю
});




inputPass.addEventListener("input", function (event) {
  strP = inputPass.value.toString().split('')
  checkInput()

  if ( (/(?=[0-9])/.test(strP)) && (/(?=[A-Z])/.test(strP)) ) {
  // if ( !(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*/.test(strP)) ) {
    passBoolean = true
  } else {
    passBoolean = false
  } // (/[A-Z]/.test(strP) && /[0-9]/.test(strP))

  if ( !(/[A-Za-z0-9\-.\+.\_.\=.\&.\#.\$.]/.test( strP[strP.length-1] )) ) {
    if (!errorPass.includes(strP[strP.length-1])) {
      errorPass[errorPass.length] = strP[strP.length-1]
      passBoolean = false
      checkInput()
    }

    forA(errorPass, strP) // delete element in "a"
    checkInput()
  } else {

    forA(errorPass, strP)
    if (errorPass == 0) {
      validPass.style.display = 'none'
    }
    checkInput()

  } // if

  checkArrErr(errorPass, errorPassElement, validPass) // Отображение неверных символов пользователю пользователю
  showError(inputPass) // отображение ошибки пользователю
}) // inputPass.addEventListener



// =======================
// function




function showError(input){
  if (input.textLength > 0) {
    input.classList.add('active')
  } else {
    input.classList.remove('active')
  } // (inputPass.textLength > 0)
}

function checkArrErr(arr, el, valid){
  if (arr.length) {
    el.innerHTML = `${arr}`
    valid.style.display = 'flex'
  }
}


function checkInput() {
  valid = passBoolean && nameBoolean
  if (valid && 2 <= inputName.value.length && errorName == 0 && errorPass == 0 && inputPass.value.length >= 8 ) {
    // console.log(inputName.textLength);
    btnSubmit.disabled = false
  } else {
    btnSubmit.disabled = true
  }
} // checkInput()



function forA(error, string) {

  for (var i = -1; i < error.length; i++) {

    if (!string.includes(error[i+1])) { // если элемент В массиве "ошибок" не найден в строке, тогда удалить эл. из массива
      error.splice(i+1, 1)
    } // if

  } // for

} // forA(a, str)
