const checkBoxZone = document.querySelector('#checkBoxThemeZoneClicked')
const checkBoxTheme = document.querySelector('#checkBoxTheme')

checkBoxZone.addEventListener('click', function(){
  console.log(`clicked`);
  checkBoxTheme.classList.toggle('active')
})



const shadeZone = document.querySelectorAll('.shade__zone')
const shade1 = document.querySelector('#shade1')
const shade2 = document.querySelector('#shade2')
const shade = [shade1, shade2]

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
      console.log(`remove active`);
    });

    // выдаем класс "active"
    shade[i].classList.toggle('active')

  } // if
} // shadeCheck
