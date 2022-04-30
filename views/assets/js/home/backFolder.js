try {

  let backFolder = document.querySelector('#backFolder');

  // получаем параметр ссылки (path=***)
  let query = backFolder.baseURI.split("?")
  query = query[ query.length - 1 ]

  // получаем путь ( все что после path=*** )
  let path = query.split('=')[1]

  // получаем разделитель
  let sep = backFolder.innerHTML[ backFolder.innerHTML.length - 1 ]

  // получаем массив с именами папок
  let arrFold = path.split(sep)



  // если находимся выше одного уровня вложенности
  if ( arrFold.length > 1 ) {

    // форматируем текст кнопки
    backFolder.innerHTML = '← ' + arrFold[ arrFold.length - 1 ]

    // форматируем ссылку ---
    let newHref = query.split( arrFold[ arrFold.length - 1 ] )

    // удаляем пустой элемент в конце
    newHref.splice( newHref.length - 1, 1)

    // преобразуем в строку
    newHref = newHref[0]

    // начало ссылки
    backFolder.href = `${sep}?`

    // добавляем в ссылку все папки (кроме последней)
    for (var i = 0; i < newHref.split(sep).length - 1; i++) {

      // если это не последний элемент то в конце добавляем разделитель
      if ( i < newHref.split(sep).length - 2 ) {
        backFolder.href += newHref.split(sep)[i] + sep
      } else {
        backFolder.href += newHref.split(sep)[i]
      }

    } // END for

    // если находимся на первом уровне вложенности
  } else {

    // форматируем текст кнопки
    backFolder.innerHTML = '← ' + arrFold[ 0 ]

    // домашняя ссылка
    backFolder.href = sep
  }

} catch (e) {

  // console.log(e);

}
