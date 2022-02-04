const inputName = document.getElementById('inputName')
const validName = document.getElementById('validName')
const error = document.getElementById('symbolError')
const btnSubmit = document.getElementById('submit')
let str
let a = []


inputName.addEventListener("input", function (event) {
  str = inputName.value.toString().split('')
  if (!/[a-zA-Z0-9_]/.test(str[str.length-1])) {
    btnSubmit.disabled = true
    // запись в 'А' нового символа если такого нет
    if (!a.includes(str[str.length-1])) {
      a[a.length] = str[str.length-1]
    }

    forA(a, str)

    // вывод ошибки пользователю
    if (a.length) {
      error.innerHTML = `${a}`
      validName.style.display = 'flex'
    }
  } else {

    btnSubmit.disabled = false
    forA(a, str)
    if (a == 0) validName.style.display = 'none'

  } // if (!/[a-zA-Z0-9_]/
    if (inputName.textLength > 0) {
      inputName.classList.add('active')
    } else {
      inputName.classList.remove('active')
    }
  // console.log(`arr str: '${str}'  || a: '${a}' || a.length: '${a.length}'`);
});




function forA(a, str) {

  for (var i = -1; i < a.length; i++) {

    if (!str.includes(a[i+1])) { // если элемент из 'А' не найден в строке, тогда удалить эл. из А
      a.splice(i+1, 1)
    } // if

  } // for

} // forA(a, str)
