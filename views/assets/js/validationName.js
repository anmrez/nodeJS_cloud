// validName
const inputName = document.getElementById('inputName'), // инпут с именем
  validName = document.getElementById('validName'), // уведомление об инвалидности
  outErrName = document.getElementById('symbolErrorName') // отображение инвалидных символов
const btnChangeName = document.getElementById('submitName') // кнопка отправки формы

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
  validation.unlockBtn(nameBoolean, btnChangeName)


  // если нет инвалидных символов то убрать уведомление с ошибками и разблокировать кнопку
  // иначе показать
  if (validation.readErr(username).length == 0) {
    validName.style.display = "none"
    if (str.length >= 4) {
      nameBoolean = [true]
    } else {
      nameBoolean = [false]
    }
    validation.unlockBtn(nameBoolean, btnChangeName) // send arr boolean, button
  } else {
    validName.style.display = "flex"
    nameBoolean = [false]
    validation.unlockBtn(nameBoolean, btnChangeName) // send arr boolean, button

    // отображение пользователи инвалидных символов
    outErrName.innerHTML = `${validation.readErr(username)}`
  }

}); // END addEvent (input)
