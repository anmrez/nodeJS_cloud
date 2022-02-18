let formData = new FormData();
const dropzone = document.getElementById('dropzone')
let files = []
const inputFile = document.getElementById('input_files')

window.addEventListener('dragenter', function() {
  console.log(`drag`);
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


function handler(e) {
  // console.log(e);
  e.preventDefault()
  e.stopPropagation()

  // тут у нас лежат перетащенные файлы
  files[files.length] = e.dataTransfer.files;
  console.log(`files:`);
  console.log(files);
  // но это не мессив, поэтому делаем массивом
  files = [...files];

  // добавляем перетащенные файлы в инпут
  inputFile.files = e.dataTransfer.files
  console.log(`input:`);
  console.log(inputFile.files);

} // handler(e)
