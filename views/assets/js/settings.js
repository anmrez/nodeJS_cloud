
// SETTINGS THEME
const checkBoxZone = document.querySelector('#checkBoxThemeZoneClicked')
const checkBoxTheme = document.querySelector('#checkBoxTheme')
let dataTheme = document.documentElement.dataset.theme
let theme = dataTheme.split('+')


// Смена основной темы
// смена активности чекбокса взависимости от темы
if (theme[0] == 'light') {
  checkBoxTheme.classList.add('active')
}
// Добавить событье на чекбокс
checkBoxZone.addEventListener('click', function(){

  checkBoxTheme.classList.toggle('active')

  if (checkBoxTheme.classList.length == 1) {
    theme[0] = 'dark'
  } else {
    theme[0] = 'light'
  } // if/else

  // меняем тему
  newTheme(theme)

}) // Event



// ===================
// ===================
// ===================

// Акцент (второстепенный цвет)
const shadeZone = document.querySelectorAll('.shade__zone')
const shade1 = document.querySelector('#shade1')
const shade2 = document.querySelector('#shade2')
const shade = [shade1, shade2]


// сделать кнопку активной в соответвии с темой
if (theme[1] == 'purple') {
  shade1.classList.add('active')
}else {
  shade2.classList.add('active')
}

// добавить всем кнопкам 'акцента' событие смены 'активности'
shadeZone.forEach((item, i) => {
  item.addEventListener('click', function(){
    shadeCheck(i)
  });
})

function shadeCheck (i){

  // Если кнопка не "active"
  if (!(shade[i].classList[2] == 'active')) {

    // удаляем у всех класс "active"
    shade.forEach((item, i) => {
      item.classList.remove('active')
      // console.log(`remove active`);
    });

    // выдаем класс "active"
    shade[i].classList.toggle('active')

  } // if

  if (shade[0].classList[2] == 'active') {
    theme[1] = 'purple'
  } else {
    theme[1] = 'blue'
  } // if/else
  console.log(`вызов функции`);

  // меняем тему
  newTheme(theme)

} // shadeCheck




// смета темы
function newTheme (theme){
  document.documentElement.dataset.theme = `${theme[0]}+${theme[1]}`
}


// END SETTINGS THEME
// SETTINGS PROFILE

const settingPass = document.querySelector('#settingPass')
const passForm = document.querySelector('#passForm')

settingPass.addEventListener('click', function(){
  settingPass.classList.toggle('active')
  passForm.classList.toggle('active')

  if (passForm.classList.length == 1) {
    setTimeout(passFormVisible, 500)
  } else {
    passForm.style.overflow = "hidden"
  } // if/else


})

function passFormVisible(){
  passForm.style.overflow = "visible"
} // passFormVisible()
