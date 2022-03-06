cookie = document.cookie
if (cookie == "") {
  document.documentElement.dataset.theme = `theme=dark+$purple`
  document.cookie = "theme=dark+purple; max-age=" + 1000*60*60*24*10
  window.location.reload()
}
document.documentElement.dataset.theme = cookie.split('=')[cookie.split('=').length-1]


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

let themeCheck = 0
// если соответсвующей темы не найдено тогда пересоздать куки с темой
// и перезагрузить страницу
for (var i = 0; i < allTheme.length; i++) {
  if (document.cookie == allTheme[i]){
    themeCheck++
  }
}
if (themeCheck != 0) {
  document.cookie = "theme=dark+purple; max-age=" + 1000*60*60*24*10
  window.location.reload()
}
