let pasteFiles = document.querySelector(".header__files")
let fileList = document.querySelectorAll(".view__files")
let fileListCopy = [] // копия списка файлов
let fileListSize = [] // хранение размеров файлов
let fileListName = [] // хранение имен файлов


for (var i = 0; i < fileList.length; i++) {
  fileListCopy[i] = fileList[i].cloneNode(true);
    // fileListCopy[i].lastChild.textContent



    // try/catch #1: заполнение массива с размерами файлов
    try {
      fileListSize[i] = fileListCopy[i].querySelector(".file__size").innerText
      arrSplit = fileListSize[i].split(' ')

      // преобразовываем все в байты
      if (arrSplit[1] == 'bt') {
        fileListSize[i] = Number(arrSplit[0])
      }
      if (arrSplit[1] == 'kb') {
        fileListSize[i] = arrSplit[0] * 1024
      }
      if (arrSplit[1] == 'mb') {
        fileListSize[i] = arrSplit[0] * (1024 * 1024)
      }
      if (arrSplit[1] == 'gb') {
        fileListSize[i] = arrSplit[0] * (1024 * 1024 * 1024)
      }

    } catch (e) {
      fileListSize[i] = -1
    } finally {

    } // END try/catch #1


    // try/catch #2: заполнение массива с именами файлов
    try {
      fileListName[i] = fileListCopy[i].querySelector(".file__name").innerText[0]
      if (fileListSize[i] == -1) {
        fileListName[i] = -1
      }
    } catch (e) {
      console.log(e);
      fileListName[i] = `err`
    } finally {

    } // END try/catch #2


} // END for




// функция меняющая классы (цвет стрелок)
function sortClassList(item, itemClass){
  sortName.classList.remove('active__up')
  sortName.classList.remove('active__down')
  sortSize.classList.remove('active__up')
  sortSize.classList.remove('active__down')

  item.classList.add(itemClass)
}


// кнопка сортировки по имени
const sortName = document.querySelector("#sortName")
let sortNameCount = 0

// сортировка по умолчанию
sortNameCount = 1
bubbleSort(fileListName, '<')

sortName.addEventListener('click', function(){
  sortSizeCount = 0
  if (sortNameCount == 0) {

    // меняем классы
    sortClassList(sortName, 'active__up')

    console.log(`по убыванию`);

    bubbleSort(fileListName, '<')
    sort()
  }
  if (sortNameCount == 1) {
    // меняем классы
    sortClassList(sortName, 'active__down')

    console.log(`по возрастанию`);

    bubbleSort(fileListName, '>')
    sortNameCount = -1
    sort()
  }
  sortNameCount++
}) // END sortName.addEvent


// кнопка сортировки по размеру
const sortSize = document.querySelector("#sortSize")
let sortSizeCount = 0
sortSize.addEventListener('click', function(){
  sortNameCount = 0
  // console.log(`sortSizeCount: ${sortSizeCount}`);
  // console.log(`sortNameCount: ${sortNameCount}`);
  if (sortSizeCount == 0) {
    // меняем классы
    sortClassList(sortSize, 'active__up')

    console.log(`по убыванию`);
    bubbleSort(fileListSize, '<')
    sort()
  }
  if (sortSizeCount == 1) {
    // меняем классы
    sortClassList(sortSize, 'active__down')

    console.log(`по возрастанию`);
    bubbleSort(fileListSize, '>')
    sortSizeCount = -1
    sort()

  }
  sortSizeCount++
}) // END sortSize.addEvent



// функци сортирующая файлы
function sort() {
  fileList.forEach((item, i) => {
    item.remove()
    pasteFiles.after(fileListCopy[i])
  });
  addFunctionalShare()
}



// сортировка пузырьком
function bubbleSort(arr, method) {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {

      if (method == `>`) {
        if (arr[i] > arr[i + 1] || arr[i] == -1) {

          sortFileList(fileListSize, i)

          sortFileList(fileListCopy, i)

          sortFileList(fileListName, i)

        } // if

      } else {

        if (arr[i] < arr[i + 1] || arr[i] == -1) {

          sortFileList(fileListSize, i)

          sortFileList(fileListCopy, i)

          sortFileList(fileListName, i)

        } // END if

      } // END if "method"

    } // END for

  } // END for

  // проверяем чтобы папка была в начале (список отрисовываеться инвертированно)
  checkFolderPosition()

  // console.log(fileListCopy);
  // console.log(fileListSize);
  // console.log(fileListName);
  return arr
} // END bubbleSort()



function sortFileList(item, index){
  let temp = item[index]
  item[index] = item[index + 1];
  item[index + 1] = temp;
}

function checkFolderPosition(){
  if ( fileListSize.indexOf(-1) == 0 ){

    fileListSize.shift()
    fileListSize.push(-1)

    fileListName.shift()
    fileListName.push(-1)

    let temp3 = fileListCopy[0]
    fileListCopy.shift()
    fileListCopy.push(temp3)
  } else {
    // выйти если в ничале не найдена папка
    // (список отрисовываеться инвертированно)
    return
  }
  // запус этой же функции
  checkFolderPosition()
}
