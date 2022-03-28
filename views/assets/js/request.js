
const xhr = new XMLHttpRequest();
xhr.open('POST', 'user', false);
xhr.send();

let user = JSON.parse(xhr.responseText)

// user.folder.split()
for (var i = 0; i < user.folder.length; i++) {
  try {
    user.folder[i] = user.folder[i].split('\\')
  } catch (e) {
    user.folder[i] = user.folder[i].split('//')
  }
  user.folder[i].splice(0, 1)
}
console.log(user.folder);
