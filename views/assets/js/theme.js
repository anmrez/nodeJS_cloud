cookie = document.cookie


let themeArr = [
  ["dark", "light"],
  ["purple", "blue"]
]
// создание масива со всеми возможными темами
let allTheme = [
  `theme=${themeArr[0][0]}+${themeArr[1][0]}`,
  `theme=${themeArr[0][0]}+${themeArr[1][1]}`,
  `theme=${themeArr[0][1]}+${themeArr[1][0]}`,
  `theme=${themeArr[0][1]}+${themeArr[1][1]}`,
]

// счетчик
let themeCheck = 0



// if#1: если есть кука темы
if ( document.cookie.includes('theme') ) {

  // разбиваем все куки в массив
  let array = document.cookie.split('; ')

  // проходимся по массиву
  for (var i = 0; i < array.length; i++) {

    // находим куку темы
    if (array[i].includes('theme')) {

      // проверка куки на валидность
      for (var j = 0; j < allTheme.length; j++) {

        // ессли есть хоть 1 совпадение то прибавить +1 в счетчик
        if (  array[i] == allTheme[j] ) {

          // меняем тему в соответсвии с кукой
          document.documentElement.dataset.theme = array[i].split('=')[1]

          themeCheck++

        }

      } // for



      // если не найдено ни одно совпадение то создаем куку
      if (themeCheck == 0) {
        document.cookie = "theme=dark+purple; max-age=" + 1000*60*60*24*365
        document.documentElement.dataset.theme = 'dark+purple'
        window.location.reload()
      }

    } // if
  } // for

// if#1: иначе если куки с темой не найдено создаем куки и перезагружаем страницу
} else {
  document.cookie = "theme=dark+purple; max-age=" + 1000*60*60*24*365
  document.documentElement.dataset.theme = 'dark+purple'
  window.location.reload()
} // END if#1
