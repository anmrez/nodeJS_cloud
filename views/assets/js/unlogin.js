// let userName = document.getElementById('UserName')

// function unlogin() {
//   if (userName !== null) {
//     userName = userName.innerText
//     document.cookie = `token=${userName}; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict`
//     location.reload()
//   } else {
//     console.error(`userName Error`);
//   };
// };

function unlogin() {
  document.cookie = `tokenkey; expires=Thu, 01 Jan 1970 00:00:01 GMT; samesite=strict`
  location.reload()
}
