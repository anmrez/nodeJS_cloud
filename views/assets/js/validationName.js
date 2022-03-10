// validName
const inputName = document.getElementById('inputName'), // инпут с именем
  validName = document.getElementById('validName'), // уведомление об инвалидности
  outErrName = document.querySelector('.symbolErrorName') // отображение инвалидных символов
const btnChangeName = document.querySelector('.submitName') // кнопка отправки формы

let stringName = ``
let nameBoolean = [false]


// создаем переменную в которой будет храниться индекс массива ошибок
let username
// записываем в переменную индекс массива ошибок
username = validation.createArrErr(username)


// блокируем кнопку отправки
validation.unlockBtn(nameBoolean, btnChangeName)

// реагируем на ввод данных в поле с именем
inputName.addEventListener("input", function (event) {
  // перевод значения инпута в строку
  stringName = inputName.value.toString()


  // запись в массив ошибок не верных символов // принимает строку, паттерн, индекс
  validation.writeErr(stringName, /^[a-zA-Z0-9_]$/ , username)


  // обновить массив ошибок // принимает булеан массив и кнопку
  // validation.unlockBtn(nameBoolean, btnChangeName)
  checkValid()

  // if#1: если нет инвалидных символов то убрать уведомление с ошибками и разблокировать кнопку
  if (validation.readErr(username).length == 0) {
    validName.style.display = "none"

    // if#2:
    if (stringName.length >= 4) {
      nameBoolean = [true]
      validName.style.display = "none"

    } else {
      nameBoolean = [false]

      // if#3:
      if (stringName.length == 0) {
        validName.style.display = "none"
      } else {
        validName.style.display = "flex"
        outErrName.innerHTML = `invalid: minimum 4 character`
      } // END if#3


    } // END if#2
    checkValid()
    // validation.unlockBtn(nameBoolean, btnChangeName)

  // if#1: иначе заблокировать кнопку и показать уведомление
  } else {
    validName.style.display = "flex"
    nameBoolean = [false]
    // validation.unlockBtn(nameBoolean, btnChangeName)
    checkValid()

    // отображение пользователи инвалидных символов
    outErrName.innerHTML = `invalid: character '${validation.readErr(username)}'`
  } // END if#1


  // сделать инпут активным если в нем что-то есть
  if (stringName.length > 0) {
    inputName.classList.add('active')
  } else {
    inputName.classList.remove('active')
  }


}); // END addEvent (input)
