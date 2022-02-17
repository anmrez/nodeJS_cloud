let formData = new FormData();
const dropzone = document.getElementById('dropzone')


window.addEventListener('dragenter', function() {
  console.log(`drag`);
  dropzone.classList.add("hover")
})


dropzone.addEventListener('dragleave', function(e) {
  console.log(`drag out`);
  dropzone.classList.remove("hover")
  handler(e)
}, false)

dropzone.addEventListener('drop', function(e) {
  console.log(`drag out`);
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
  console.log(e);
  e.preventDefault()
  e.stopPropagation()

  // тут у нас лежат перетащенные файлы
  let files = e.dataTransfer.files;
  let types = e.dataTransfer.types
  // но это не мессив, поэтому делаем массивом
  files = [...files];
  types = [...types];

  files.forEach(file => {
    // переадаём файл форме
    formData.append('file', file);

    // начинаем делать предпросмотр
    // именно тут, просто создаём html-элементы и кидаем их настраницу
    let preview = document.createElement('li');
    file_list.appendChild(preview);

    // в идеале нужно проверить является ли файл картинкой
    makePreview(file).then(image => {
      let img = document.createElement('img');
      img.src = image;
      preview.appendChild(img);
    });
  }); // files.forEach
  console.log(files);
} // handler(e)




// вот тут, через FileReader читаем изображание
function makePreview(file){
  let fr = new FileReader();

  return new Promise(resolve => {
    fr.readAsDataURL(file);
    // и когда оно готово, отдаём ответ
    fr.onloadend = () => resolve(fr.result)
  });
}
// отправка всего на сервер
submitBtn.onclick = function() {
  let url = "/"; // URL куда отправляем файлы
  fetch(url, {
    method: 'POST',
    body: formData
  })
  // всё заргузилось
  .then(resp => console.log(resp))
  // какие-то проблемы
  .catch(err => console.error(err))
}
