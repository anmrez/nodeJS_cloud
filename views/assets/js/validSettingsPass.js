const inputsPassword = document.querySelectorAll('.inputsPassword')
const validsPass = document.querySelectorAll('.validsPass')
const errorPassElement = document.querySelectorAll('.symbolsErrorPass')

let strP = []
let errorPass = []
let passBoolean = []
const btnSubmit = document.getElementById('submit')
for (var i = 0; i < inputsPassword.length; i++) {
  strP[i] = inputsPassword[i].defaultValue.split('')
  errorPass[i] = []
  passBoolean[i] = false
}


// checkInput()

inputsPassword.forEach((item, i) => {
  item.addEventListener("input", function (event) {
    strP[i] = item.value.toString().split('')
    checkInput()

    if ( (/(?=[0-9])/.test(strP)) && (/(?=[A-Z])/.test(strP[i])) ) {
      // если есть одна заглавная и одна цифра
        passBoolean[i] = true
      } else {
        passBoolean[i] = false
      }

      if ( !(/[A-Za-z0-9\-.\+.\_.\=.\&.\#.\$.]/.test( strP[i][strP[i].length-1] )) ) {
        if (!errorPass.includes(strP[i][strP.length-1])) {
          errorPass[i][errorPass[i].length] = strP[i][strP[i].length-1]
          passBoolean[i] = false
          checkInput()
        }

        forA(errorPass[i], strP[i], i) // delete element in "a"
        checkInput()
      } else {

        forA(errorPass[i], strP[i], i)
        if (errorPass[i] == 0) {
          validsPass[i].style.display = 'none'
        }
        checkInput()

      } // if



      // проверка двух новых паролей
      if (inputsPassword[1].value == inputsPassword[2].value) {
        // если равны
        passBoolean[1] = true
        passBoolean[2] = true
        if (errorPass[2] == 0) {
          matchPass.style.display = 'none'
          validsPass[2].style.display = 'none'
        }
        checkInput()
      } else {
        // не если равны
        passBoolean[1] = false
        passBoolean[2] = false
        if (errorPass[2] == 0) {
          validsPass[2].style.display = 'block'
          matchPass.style.display = 'block'
        } else {
          matchPass.style.display = 'none'
        }
        checkInput()
      }

      checkArrErr(errorPass[i], errorPassElement[i], validsPass[i]) // Отображение неверных символов пользователю пользователю
      showError(item) // отображение ошибки пользователю
    }) // inputPass.addEventListener

}); // forEach






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
  if (passBoolean[0] == true) {
    if (passBoolean[1] == true) {
      if (passBoolean[2] == true) {
        submit.disabled = false
      } else {
        submit.disabled = true
      }
    } else {
      submit.disabled = true
    }
  } else {
    submit.disabled = true
  }

} // checkInput()



function forA(error, string, j) {

  try {
    for (var i = -1; i < error.length; i++) {
      if (!string.includes(error[j][i+1])) { // если элемент В массиве "ошибок" не найден в строке, тогда удалить эл. из массива
        error.splice(i+1, 1)
      } // if

    } // for
  } catch (e) {

  }

} // forA(a, str)
