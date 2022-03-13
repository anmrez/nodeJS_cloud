const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js'),
  validRole = require('../lib/validRole.js')

let userFiles = []


module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)





  // try/catch #1
  try {
    // valid role in "ADMIN" (admin == true)
    role = validRole(req, jwt.verify(req.cookies.tokenkey, secret).role)

    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user folder
    pathFiles = path.join(appDir, 'userStorage', userID)


      // try/catch #2
      try {
        // read user files
        userFileName = fs.readdirSync(pathFiles, 'utf8')


        // пройтись по массиву с названиями и узнать обьем каждого файла
        let folders = []
        let userFileSize = []
        let units
        for (var i = 0; i < userFileName.length; i++) {
          stats = fs.statSync(path.join(appDir, 'userStorage', userID, userFileName[i]))

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

        // обьединить все обьекты в массив
        for (var i = 0; i < userFileName.length; i++) {
          userFiles[i] = {
            name: userFileName[i],
            size: userFileSize[i],
            isFolder: folders[i]
          }
        } // END for

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
      userID: userID
    }) // render 'home'

  // try/catch #1
  } catch (e) {

    if (loggingConsole) {
      // console.log(e);
      console.log(`user undefiend in DB`);
      console.log(`redirect in "login"`);

      // определяем ошибку
      jwt.verify(req.cookies.tokenkey, secret, function(err, decoded) {
        if (err) {
          console.log(err.message);
        }
      }); // jwt

    } // if

    // delete cookie
    res.clearCookie("tokenkey");
    res.redirect('/login')




  } // END try/catch #1
} // module
