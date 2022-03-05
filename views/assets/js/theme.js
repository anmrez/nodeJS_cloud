cookie = document.cookie
if (cookie == "") {
  document.documentElement.dataset.theme = `theme=dark+$purple`
  document.cookie = "theme=dark+purple; max-age=" + 1000*60*60*24*365
  // window.location.reload()
}
document.documentElement.dataset.theme = cookie.split('=')[cookie.split('=').length-1]
