const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js'),
  validRole = require('../lib/validRole.js')



module.exports = function (req, res) {
  let userFiles = []
  let presenceOfFiles,  locationInFolder, folder
  consoleLog(req, res, loggingConsole)

  console.log( req.query );


  // try/catch #1
  try {
    // valid role in "ADMIN" (admin == true)
    role = validRole(req, jwt.verify(req.cookies.tokenkey, secret).role)

    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    console.log(userID);


    // find path in user folder
    if (req.query.folder) {
      // если находимся в подкаталоге
      pathFiles = path.join(  appDir, 'userStorage', userID, req.query.folder )
      console.log(pathFiles);
      locationInFolder = true
      folder = req.query.folder

      // иначе каталог пользователя
    } else {
      pathFiles = path.join( appDir, 'userStorage', userID )
      console.log(pathFiles);
      locationInFolder = false
    }

      // try/catch #2
      try {
        // read user files
        userFileName = fs.readdirSync(pathFiles, 'utf8')
        console.log(`userFileName:`);
        console.log(userFileName);

        // пройтись по массиву с названиями и узнать обьем каждого файла
        let folders = []
        let userFileSize = []
        let units
        for (var i = 0; i < userFileName.length; i++) {
          // stats = fs.statSync(path.join(appDir, 'userStorage', userID, userFileName[i]))
          stats = fs.statSync( path.join( pathFiles, userFileName[i] ) )

          // проверяем является ли это папкой
          folders[i] = stats.isDirectory()

          fileSizeInBytes = stats.size;

          // записаем кол-во байтов
          userFileSize[i] = fileSizeInBytes

          // определяем единизу измерения размера файла
          units = ` bt`
          if (fileSizeInBytes / 1024 > 1) {
            userFileSize[i] = fileSizeInBytes / 1024
            units = ` kb`

            if (fileSizeInBytes / (1024 * 1024) > 1) {
              userFileSize[i] = fileSizeInBytes / (1024 * 1024)
              units = ` mb`

              if (fileSizeInBytes / (1024 * 1024 * 1024) > 1) {
                userFileSize[i] = fileSizeInBytes / (1024 * 1024 * 1024)
                units = ` gb`
              }
            }
          }

          // проваряем чтобы небыло нуля в конце ( != 1.0)
          if (userFileSize[i].toFixed(1).split('.')[1] != 0) {
            userFileSize[i] = userFileSize[i].toFixed(1)
          }
          // add units in size
          userFileSize[i] = userFileSize[i] + units
        } // END for


        // если в папке пользователя найдены файлы
        if (  userFileName.length > 0 ) {
          // обнуляем массив (при удалении файла последний дюпается)
          userFiles = []
          // обьединить все обьекты в массиву
          for (var i = 0; i < userFileName.length; i++) {
            userFiles[i] = {
              name: userFileName[i],
              size: userFileSize[i],
              isFolder: folders[i]
            }
          } // END for

          // есть наличие фалов
          presenceOfFiles = true
        } else {
          // иначе обнуляем список файлов
          userFiles = []
          // нет наличия файлов
          presenceOfFiles = false
        } // END if

        // содержимое файлов
        console.log(userFiles);


      // try/catch #2
      } catch (e) {
        console.log(e);

        // create folder if it doesn't exist
        fs.mkdirSync(path.join(appDir, 'userStorage', userID), { recursive: true, force: true })

      } // END try/catch #2


    res.render('home', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role,
      home: true,
      userFiles: userFiles,
      userID: userID,
      presenceOfFiles: presenceOfFiles,
      locationInFolder: locationInFolder,
      folder: folder,
    }) // render 'home'


  // try/catch #1
  } catch (e) {


    if (loggingConsole) {
      // console.log(e);

      // определяем ошибку
      jwt.verify(req.cookies.tokenkey, secret, function(err, decoded) {
        if (err) {

          // если сессия устарела
          // jwt expired
          if (err.message == 'jwt expired') {
            console.log(`jwt err:`);
            console.log(err);

            // delete cookie
            res.clearCookie("tokenkey");
            res.redirect('/login?session=expired')
          } else {
            console.log(`user undefiend in DB`);
            console.log(`redirect in "login"`);

            // delete cookie
            res.clearCookie("tokenkey");
            res.redirect('/login?session=undefined')
          }
        } // END if (err)

      }); // jwt

    } // if

    // // delete cookie
    // res.clearCookie("tokenkey");
    // res.redirect('/login')




  } // END try/catch #1
} // module
