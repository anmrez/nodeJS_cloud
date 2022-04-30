// обработка вложенностей папок =======

// обрабатываем вложенности папок в ферме
function handlerFolderFIW () {

  const folder = managementForm.querySelector('#FIWFolder')
  const mainFolder = folder.childNodes[0]
  foldersLevelListener ( mainFolder, 0 )

  pathMove = document.createElement( 'input' )
  pathMove.type = "hidden"
  pathMove.name = "move"
  pathMove.id = 'pathMove'


}


function showFolderLevels ( level, file ) {

  // console.log( `______` );
  // console.log( `showFolderLevels` );
  // console.log( `level: ${level} ++` );

  level++
  const folder = managementForm.querySelector('#FIWFolder')
  const mainFolder = folder.childNodes[0]
  let arr = []
  let lastTarget, nameLastTarget
  let fileName = file.dataset.folder

  user.folder.forEach( ( item, i ) => {

    let param = true

    if ( level >= 2 ) {

      param = item[ item.length - 2 ] == fileName

    }

    // если елемент уровнем выше и родителем являеться ...
    if ( item.length == level && param  ) {

      // клонируем элемент папки
      arr[ arr.length ] = item
      newFolder = mainFolder.cloneNode(true)
      newFolder.classList.remove('active')

      newFolder.style.animation = ''
      newFolder.innerHTML = item[ item.length - 1 ]
      newFolder.dataset.folder = item[ item.length - 1 ]
      newFolder.dataset.level = level
      newFolder.classList.remove( 'highlight' )
      newFolder.style.marginLeft  = level * 5 + 'px'

      newFolder.dataset.link = ''
      let link = '/' + item
      link = link.split(',')
      link.forEach( ( item, i ) => {

        newFolder.dataset.link += item + '/'

      });

      // вешаем слушатель на 'клон' и создаем после нажатой папки
      foldersLevelListener ( newFolder, level )
      file.after( newFolder )
      newFolder.style.animation = '0.1s ease 0s 1 normal none running folderShow'
      // newFolder.style.animation = '0.1s ease 0s 1 normal none running folderHide'

    }

  });

}


function hideFolderLevels ( level, fileName ) {

  // принимает уровень файла и его навзвание
  const folder = managementForm.querySelector('#FIWFolder')
  const mainFolder = folder.childNodes[0]
  let removEl = []

  // ищем все дочерние элементы и записываем их в массив
  user.folder.forEach( ( item, i ) => {

    let param = item[ level - 1 ] == fileName
    let param2 = item.length >= level + 1
    let param3 = mainFolder.dataset.folder == fileName

    // 'элемент уровнем ниже = имени файла на который надали' и '' или 'если это основная папка'
    if ( (param && param2) || param3 ) {

      // записываем последние значения в массивах ( название всех дочерних папок )
      removEl[ removEl.length ] = item[ item.length - 1 ]

    }

  });

  // удаляем все дочерние папки
  removEl.forEach( ( item, i ) => {

    try {

      let elem = folder.querySelector(`[data-folder="${ item }"]`)
      elem.style.animation = '0.1s ease 0s 1 normal forwards running folderHide'
      setTimeout( remove, 110, elem )

    } catch (e) {

    }

  });

  function remove ( elem ) {

    elem.remove()

  }


}


function foldersLevelListener ( elem, level ) {

  // добавляем слушатели на папки
  // принимает элемент и уровень вложенности
    elem.onclick = function (e) {

      let elemLevel = elem.dataset.level
      let folder = managementForm.querySelector('#FIWFolder')
      // folder = folder.childNodes

      // если клик был сделан в пределах 25px
      if ( e.layerX <= 25 ) {

        // раскрываем папку
        // меняем класс 'активности'
        if ( elem.classList.value.indexOf('active') == -1  ) {

          elem.classList.add( 'active' )
          showFolderLevels ( level, elem )

        } else {

          elem.classList.remove( 'active' )
          hideFolderLevels ( level, elem.dataset.folder )

        }

      } else {

        // выделение элемента для отправки его ссылки на серевер
        try {

          let amountElem = folder.querySelectorAll( '.highlight' )
          amountElem.forEach( ( item, i ) => {

            item.classList.remove( 'highlight' )

          });

          elem.classList.add( 'highlight' )

          

          // добавляем поле с путем в форму
          let fiwContent = document.querySelector( '.FIW__content' )
          pathMove.value = elem.dataset.link
          fiwContent.append( pathMove )
          console.log( pathMove );

        } catch (e) {

          elem.classList.add( 'highlight' )

        }

      }






    }

}

// обработка вложенностей папок =======
