// validName

const inputName = document.getElementById('inputName'), // инпут с именем
  validName = document.getElementById('validName'), // уведомление об инвалидности
  outArrErr = document.getElementById('symbolErrorName'), // отображение инвалидных символов
  btnChangeName = document.getElementById('submitName') // кнопка отправки формы
  // try {
  //   // const btnSubmit = document.getElementById('submit')
  // } catch (e) {
  // }

let str = ``
let nameBoolean = false



// создаем переменную в которой будет храниться индекс массива ошибок
let username
// записываем в переменную индекс массива ошибок в массива
username = validation.createArrErr(username)


// блокируем кнопку отправки
unclockBtn(nameBoolean)


// реагируем на ввод данных в поле с именем
inputName.addEventListener("input", function (event) {


  // перевод значения инпута в строку
  str = inputName.value.toString()


  // запись в массив ошибок не верных символов
  validation.writeErr(str ,/^[a-zA-Z0-9_]$/ , username)


  // обновить массив ошибок
  invalidNameSimbol = validation.readErr(username)


  // если нет инвалидных символов то убрать уведомление с ошибками и разблокировать кнопку
  // иначе показать
  if (invalidNameSimbol.length == 0) {
    validName.style.display = "none"
    nameBoolean = true
    unclockBtn(nameBoolean)
  } else {
    validName.style.display = "flex"
    nameBoolean = false
    unclockBtn(nameBoolean)
  }


  // отображение пользователи инвалидных символов
  outArrErr.innerHTML = `${invalidNameSimbol}`

}); // END addEvent (input)


function unclockBtn (bool){
  if (bool) {
    btnChangeName.disabled = false
  } else {
    btnChangeName.disabled = true
  }
}
