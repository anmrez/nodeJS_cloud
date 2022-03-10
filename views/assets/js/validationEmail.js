const inputEmail = document.getElementById('inputEmail'), // инпут с почтой
  validEmail = document.getElementById('validEmail'), // уведомление об инвалидности
  outErrEmail = document.querySelector('.symbolErrorEmail') // отображение инвалидных символов
const btnChangeEmail = document.querySelector('.submitEmail') // кнопка отправки формы

let stringEmail = ``;
// "статус валидности"
let emailBoolean = [false];

// создаем переменную в которой будет храниться индекс массива ошибок
let email;
// записываем в переменную индекс массива ошибок
email = validation.createArrErr(email);

// блокируем кнопку отправки (принимает: статус валидности и кнопку)
// validation.unlockBtn(emailBoolean, btnChangeEmail)

// реагируем на ввод данных в поле с именем
inputEmail.addEventListener("input", function (event) {
  // перевод значения инпута в строку
  stringEmail = inputEmail.value.toString()

  // запись в массив ошибок не верных символов // принимает строку, паттерн, индекс
  validation.writeErr(stringEmail, /[a-z0-9._%+-@]/ , email)


  // обновить массив ошибок // принимает булеан массив и кнопку
  // validation.unlockBtn(emailBoolean, btnChangeEmail)


  // if#1: если нет инвалидных символов то убрать уведомление с ошибками и разблокировать кнопку
  if (validation.readErr(email).length == 0) {
    validEmail.style.display = "none"
    emailBoolean = [true]
    checkValid()

  // if#1: иначе заблокировать кнопку и показать уведомление
  } else {
    validEmail.style.display = "flex"
    emailBoolean = [false]
    // validation.unlockBtn(emailBoolean, btnChangeEmail)
    checkValid()

    // отображение пользователи инвалидных символов
    outErrEmail.innerHTML = `invalid: character '${validation.readErr(email)}'`
  } // END if#1


  // сделать инпут активным если в нем что-то есть
  if (stringEmail.length > 0) {
    inputEmail.classList.add('active')
  } else {
    inputEmail.classList.remove('active')
  }

}); // END addEvent (input)
