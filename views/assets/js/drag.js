let formData = new FormData()
const dropzone = document.getElementById('dropzone')
console.log(dropzone);
dropzone.addEventListener('dragenter', function() {
  // dropzone.class = "hover"
  dropzone.classList.add("hover")
  console.log(`dropzone add 'hover'`);
});

['drop', 'dragleave'].forEach((item) => {
  dropzone.addEventListener(item, function() {
    // dropzone.className = "";
    dropzone.classList.remove("hover")
    console.log(`dropzone remove 'hover'`);
  });
});

['drop', 'dragleave'].forEach((item) => {
  dropzone.addEventListener(item, function(e) {
    console.log(`item:`);
    console.log(e);
    e.preventDefault()
    e.stopPropagation()

    let files = e.dataTransfer.files

    files = [...files]

    files.forEach((file) => {
      formData.append('file', file)

      let preview = document.createElement('li')
      file_list.appendChild(preview)

      makePreview(file).then(image => {
        let img = document.createElement('img');
        img.src = image;
        preview.appendChild(img);
      }); // makePreview(file)

      submitBtn.className = "";


    }); // files.forEach
  }, false); // dropzone.addE
}); // forEach



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
  let url = null; // URL куда отправляем файлы
  fetch(url, {
    method: 'POST',
    body: formData
  })
  // всё заргузилось
  .then(resp => console.log(resp))
  // какие-то проблемы
  .catch(err => console.error(err))
}
