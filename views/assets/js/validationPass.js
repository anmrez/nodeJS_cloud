const inputsPassword = document.querySelectorAll('.inputsPassword')  // инпут с паролями
const validsPass = document.querySelectorAll('.validsPass') // уведомление об инвалидности
const outErrPass = document.querySelectorAll('.symbolsErrorPass') // отображение инвалидных символов
const btnChangePass = document.querySelector('.submitPass') // кнопка отправки


let stringPass = []
let passBoolean = []
let changePass = []

for (var i = 0; i < inputsPassword.length; i++) {
  stringPass[i] = inputsPassword[i].defaultValue.split('')
  outErrPass[i] = []
  passBoolean[i] = false

  // создаем переменную в которой будет храниться индекс массива ошибок
  // let changePass[i]
  // записываем в переменную индекс массива ошибок
  changePass[i] = validation.createArrErr(changePass[i])
}





// блокируем кнопку отправки
validation.unlockBtn(passBoolean, btnChangePass)

inputsPassword.forEach((item, i) => {
  item.addEventListener("input", function (event) {
    // перевод значения инпута в строку
    stringPass[i] = item.value.toString()

    // запись в массив ошибок не верных символов // принимает строку, паттерн, индекс
    validation.writeErr(stringPass[i], /[A-Za-z0-9\-.\+.\_.\=.\&.\#.\$.\*.]/ , changePass[i])

    // обновить массив ошибок // принимает булеан массив и кнопку
    // validation.unlockBtn(passBoolean, btnChangePass)
    checkValid()




    //  if#1: если нет инвалидных символов
    if (validation.readErr(changePass[i]).length == 0) {


      // if#2: если строка больше или равна 8 символов
      if (stringPass[i].length >= 8) {
        // убрать уведомление с ошибками
        validsPass[i].style.display = "none"
        passBoolean[i] = true


        // if#3: если есть заглавная буква
        if ( /(?=[A-Z])/.test( inputsPassword[i].value )) {
          validsPass[i].style.display = "none"
          passBoolean[i] = true


          // if#4: если есть цифра
          if ( /(?=[0-9])/.test( inputsPassword[i].value )) {
            validsPass[i].style.display = "none"
            passBoolean[i] = true


              try {
                // if#5: если новые пароли совпадают
                if (inputsPassword[1].value == inputsPassword[2].value) {
                  validsPass[2].style.display = "none"
                  passBoolean[2] = true


                  // if#5: иначе сообщить о не совпадении
                } else {
                  validsPass[2].style.display = "flex"
                  passBoolean[2] = false
                  outErrPass[2].innerHTML = `passwords not match`
                } // END if#5

              } catch (e) {
                // console.log(e);
              }


          // if#4: иначе сообщить об ее отсутсвии
          } else {
            validsPass[i].style.display = "flex"
            passBoolean[i] = false
            outErrPass[i].innerHTML = 'invalid: no number '
          }


        // if#3: иначе сообщить об ее отсутсвии
        } else {
          validsPass[i].style.display = "flex"
          passBoolean[i] = false
          outErrPass[i].innerHTML = 'invalid: no capital letter'
        } // END if#3


      // if#2: иначе показать уведомление
      } else {
        passBoolean[i] = false
        validsPass[i].style.display = "flex"
        outErrPass[i].innerHTML = 'invalid: minimum 8 character'
      } // END if#2
      // validation.unlockBtn(passBoolean, btnChangePass)
      checkValid()

    // if#1: иначе показать уведомление с ошибками и заблокировать кнопку
    } else {
      validsPass[i].style.display = "flex"
      passBoolean[i] = false
      // validation.unlockBtn(passBoolean, btnChangePass)
      checkValid()

      // отображение пользователю инвалидных символов
      outErrPass[i].innerHTML = `invalid: character '${validation.readErr(changePass[i])}'`
    } // END if#1


    // если строка пустая то уведомления не показывать
    if (stringPass[i].length == 0) {
      validsPass[i].style.display = "none"
      passBoolean[i] = false
    }





    // сделать инпут активным если в нем что-то есть
    if (stringPass[i].length > 0) {
      inputsPassword[i].classList.add('active')
    } else {
      inputsPassword[i].classList.remove('active')
    }


    }) // inputPass.addEventListener
}); // forEach
