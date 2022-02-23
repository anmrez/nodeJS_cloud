const formFiles = document.getElementById('formFiles')
const inputFile = document.getElementById('input_files')
let formData = new FormData(formFiles)
const dropzone = document.getElementById('dropzone')
const buttonForm = document.getElementById('buttonForm')
let files = []

window.addEventListener('dragenter', function() {
  // console.log(`drag`);
  dropzone.classList.add("hover")
})


dropzone.addEventListener('dragleave', function(e) {
  // console.log(`drag out`);
  dropzone.classList.remove("hover")
  handler(e)
}, false)

dropzone.addEventListener('drop', function(e) {
  // console.log(`drag out`);
  dropzone.classList.remove("hover")
  handler(e)
}, false)



window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);


async function handler(e) {
  // console.log(e);
  e.preventDefault()
  e.stopPropagation()

  // тут у нас лежат перетащенные файлы
  // files[files.length] = e.dataTransfer.files;
  files = e.dataTransfer.files;
  files = [...files];

  files.forEach(file => {
    // переадаём файл форме
    formData.append('file', file);
  })
//   for(let [name, value] of formData) {
//   alert(`${name} = ${value.name}`); // key1=value1, потом key2=value2
// }

  console.log(`files:`);
  console.log(files);
  // но это не мессив, поэтому делаем массивом

  // добавляем перетащенные файлы в инпут
  inputFile.files = e.dataTransfer.files
  console.log(`input:`);
  console.log(inputFile.files);
  buttonForm.click()

  // отправка формы
  // for(let [name, value] of formData) {
  //   let response = await fetch('/upload', {
  //     method: 'POST',
  //     headers: {
  //       enctype:"multipart/form-data"
  //     },
  //     body: `${name} = ${value.name}`,
  //   });
  //   console.log(response);
  // }



} // handler(e)
