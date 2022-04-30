const jwt = require('jsonwebtoken'),
  {Readable} = require('stream'),
  fs = require('fs'),
  path = require('path'),
  {secret, appDir, loggingConsole} = require('../../lib/config.js'),
  consoleLog = require('../../lib/loggingConsole.js')

let pathFiles, userID


module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  userID = jwt.verify(req.cookies.tokenkey, secret).id
  console.log(req.query);

  try {


    // путь к папке пользователя
    pathFiles = path.join( appDir, 'userStorage', userID )
    // создание папки если она отстуствует
    await fs.promises.mkdir(pathFiles, { recursive: true })



    let files = req.files.uploadFiles
    // запись файлов на сервер
    if (files.length == null) {

      if ( req.query.path != null ){
        // создание пути
        pathFiles = path.join(appDir, 'userStorage', userID, req.query.path, files.name)
      } else {
        pathFiles = path.join(appDir, 'userStorage', userID, files.name)
      }

      // сохранение
      files.mv(pathFiles)

    } else {

      // пройтись по списку файлов и записать их
      for (var i = 0; i < files.length; i++) {

        if ( req.query.path != null ){
          // создание пути
          pathFiles = path.join(appDir, 'userStorage', userID, req.query.path, files.name)
        } else {
          pathFiles = path.join(appDir, 'userStorage', userID, files.name)
        }


        // сохранение
        files[i].mv(pathFiles)
      } // for
    } // if


    // если находимся в папке
    if ( req.query.path != null ) {
      // перенаправляем туда откуда был сделан запрос
      let href = '/?path=' + req.query.path
      res.redirect(href)

    } else {
      // иначе редирект домой
      res.redirect('/')
    }

  } catch (e) {
    console.log(`=======`);
    console.log(`error:`);
    console.log(e);
    console.log(req.files);
    // res.status(500);
    // res.render('error', {
    //   layout: 'error',
    //   codeError: 500,
    //   textError: `ошибка с загрузкой файлов`
    // });
    res.redirect('/')
  } // try/catch
} // module
