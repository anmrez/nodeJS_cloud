let arrErr = []

const validation = {
  createArrErr: function(index){
    index = arrErr.length
    arrErr[index] = []
    return index
  },
  writeErr: function(string, pattern, index){

    // преобразовать строку в массив
    let stringArray = string.split('')

    // пройтись по массиву из строки
    for (var i = 0; i < stringArray.length; i++) {

      // если символ не валидный
      if (!pattern.test(stringArray[i])){

        // если в массиве ошибок нет данного символа
        if (!arrErr[index].includes(stringArray[i])) {

          // записать его в массив ошибок
          arrErr[index].push(stringArray[i])
          // console.log(`добавлен символ в arrErr ${arrErr[i]}`);
          // console.log(`arrerr: ${arrErr}`);
        } // if
      } // if
    } // for


    for (var i = 0; i < arrErr[index].length; i++) {

      // если в строке нету символа из массива ошибок
      if (!stringArray.includes(arrErr[index][i])) {

        // то удалить это символ из массива ошибок
        // console.log(`удален символ из arrErr ${arrErr[i]}`);
        arrErr[index].splice(i, 1)
      } //if
    } // for


    // if (arrErr[index].includes) {
    //
    // }

  },
  readErr: function(index){
    return arrErr[index]
  },
  unlockBtn: function(arrBool, button) {
    let arrBoolTrue = []
    for (var i = 0; i < arrBool.length; i++) {
      arrBoolTrue[i] = true
    }
    if (arrBoolTrue == arrBool) {

    }
  }


} // validation
