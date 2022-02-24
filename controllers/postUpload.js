const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  {Readable} = require('stream'),
  fs = require('fs'),
  path = require('path'),
  {appDir} = require('../lib/config.js')
let pathFiles, userID


module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`post upload:`);
  userID = jwt.verify(req.cookies.tokenkey, secret).id


  try {
    // путь к папке
    pathFiles = path.join(appDir, 'userStorage', userID)
    // создание папки если она отстуствует
    await fs.promises.mkdir(pathFiles, { recursive: true })



    let files = req.files.uploadFiles
    // запись файлов на сервер
    if (files.length == null) {
      // создание пути
      pathFiles = path.join(appDir, 'userStorage', userID, files.name)
      // сохранение
      files.mv(pathFiles)
    } else {
      for (var i = 0; i < files.length; i++) {
        // создание пути
        pathFiles = path.join(appDir, 'userStorage', userID, files[i].name)
        // сохранение
        files[i].mv(pathFiles)
      } // for
    } // if


    res.redirect('/')
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
