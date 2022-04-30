const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js'),
  validRole = require('../lib/validRole.js')



module.exports = function (req, res) {
  let userFiles = []
  let presenceOfFiles,  locationInFolder,
  pathFolder = ''
  let units = ` bt` // единыца измерения
  let folders = []
  let userFileSize = [] // массив с размерами файлов
  consoleLog(req, res, loggingConsole)


  // try/catch #1
  try {
    // valid role in "ADMIN" (admin == true)
    role = validRole(req, jwt.verify(req.cookies.tokenkey, secret).role)

    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // console.log(userID);


    // find path in user folder
    if (req.query.path) {
      // если находимся в подкаталоге

      // добавляем разделитель после папок в пути
      req.query.path+= `/`

      // путь к файлу/папке
      pathFiles = path.join(  appDir, 'userStorage', userID, req.query.path )
      // console.log(pathFiles);

      // находия в папке
      locationInFolder = true

      // путь папок
      pathFolder = req.query.path

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

        // let folders = []
        // let userFileSize = []
        // let units

        // узнать обьем каждого файла и его тип
        fileOptions()


        // если в папке пользователя есть файлы
        if (  userFileName.length > 0 ) {
          // обнуляем массив (при удалении файла последний дюпается)
          userFiles = []
          // обьединить все параметры в обьект, а его в массив
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
      path: pathFolder,
    }) // render 'home'


  // try/catch #1
  } catch (e) {

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
          res.redirect('/login')
          // res.redirect('/login?session=undefined')
        }
      } // END if (err)

    }); // jwt


  } // END try/catch #1



  function fileOptions (){

    // функция для нахождения обьема, ед. измерения, и типа файла( папка/файл )
    for (var i = 0; i < userFileName.length; i++) {

      stats = fs.statSync( path.join( pathFiles, userFileName[i] ) )

      // проверяем является ли это папкой
      folders[i] = stats.isDirectory()

      // узнаем обьем файла (в байтах)
      fileSizeInBytes = stats.size;

      // записаем кол-во байтов
      userFileSize[i] = fileSizeInBytes

      // определяем единизу измерения файла
      units = definitionUnits( fileSizeInBytes, userFileSize[i] )

      // определяем размер файла ( ЕД )
      userFileSize[i] = definitionSize ( units, fileSizeInBytes )


      // проверяем чтобы небыло нуля в конце ( != 1.0)
      if (userFileSize[i].toFixed(1).split('.')[1] != 0) {
        userFileSize[i] = userFileSize[i].toFixed(1)
      }
      // add units in size
      userFileSize[i] = userFileSize[i] + units
    } // END for

  } // END


  function definitionUnits( byte ) {
    // определяет единицу измерения
    if (byte / (1024 * 1024 * 1024) > 1) {
      return ` gb`
    } else {

      if (byte / (1024 * 1024) > 1) {
        return ` mb`
      } else {

        if (byte / 1024 > 1) {
          return ` kb`
        } else {

          return ` bt`

        } // kb

      } // mb

    } // gb

  } // END definitionUnits()


  function definitionSize ( unit, byte ) {
    // определяет обьем в соотвествии с единицой измерения
    if ( unit == ` kb` ) {
      return byte / 1024
    }

    if ( unit == ` mb` ) {
      return byte / 1024 / 1024
    }

    if ( unit == ` gb` ) {
      return byte / 1024 / 1024 / 1024
    } else {
      return byte
    }

  } // END definitionSize()



} // module
