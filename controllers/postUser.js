const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js')

module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)

  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', 'user', false);
  // xhr.send();
  // JSON.parse(xhr.responseText)

  let object = {
    // id: ,
    folder: [],
  }


  try {

    // получаем ID пользователя
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // записываем ID пользователя
    object.id = userID


    // сканируем все папки
    scanningFolders( path.sep )

    function scanningFolders( folder ){
      let pathFiles = path.join( appDir, 'userStorage', userID, folder )
      let folderName = fs.readdirSync(pathFiles, 'utf8')

      // проходимся по всем файлам в каталоге
      for (var i = 0; i < folderName.length; i++) {
        stats = fs.statSync( path.join( pathFiles, folderName[i] ) )

        // если это являеться папкой
        if ( stats.isDirectory() ) {

          // добавить в object пути папок
          object.folder[ object.folder.length ] = path.join( folder, folderName[i] )

          // console.log( folderName[i] );
          scanningFolders( path.join( folder, folderName[i] ) )

        } // END if
      } // END for
    } // END scanningFolders()

    // отправляем JSON
    res.json(object);

  } catch (e) {
    console.log(e);
    res.json( {err: e} );

  }



} // END module
