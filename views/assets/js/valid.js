const inputName = document.getElementById('inputName')
const validName = document.getElementById('validName')

inputName.addEventListener("input", function (event) {
  if (inputName.validity.patternMismatch) {
    if (inputName.textLength > 1) {
      validName.style.display = 'flex'
    }
  } else {
    validName.style.display = 'none'
  }
  // console.log(inputName.value, inputName.validity.patternMismatch);
});
