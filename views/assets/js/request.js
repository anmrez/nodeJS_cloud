
const xhr = new XMLHttpRequest();

// отправляем POST запрос на '/user'
xhr.open('POST', 'user', false);
xhr.send();

// получаем JSON с путями папок и ID
let user = JSON.parse(xhr.responseText)

for (var i = 0; i < user.folder.length; i++) {
  // убираем первый элкмент (пустой)
  user.folder[i].splice(0, 1)
}
// console.log(user.folder);
