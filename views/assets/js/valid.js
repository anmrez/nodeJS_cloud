const inputName = document.getElementById('inputName')
const validName = document.getElementById('validName')
const error = document.getElementById('symbolError')
let str
let a = []


inputName.addEventListener("input", function (event) {
  str = inputName.value.toString().split('')

  console.log(str[str.length-1]);
  if (!/[a-zA-Z0-9_]/.test(str[str.length-1])) {
    console.log(`invalid`);
    a[a.length] = str[str.length-1]
    if (a.length > -1) {
      error.innerHTML = `${a}`
      validName.style.display = 'flex'
    }
  }
  console.log(`a= ${a}`);
});
