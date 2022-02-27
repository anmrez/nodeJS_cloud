const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js')


  let userFiles = {}
  let linksFiles = []


module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)

  try {
    // проверка роли Админа
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
      // console.log(`role: ${role}`);
    } else {
      role = false
      // console.log(`role: ${role}`);
    }



    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user folder
    pathFiles = path.join(appDir, 'userStorage', userID)

      try {
        // write user files
        userFiles = fs.readdirSync(pathFiles, 'utf8')
        // console.log(userFiles);
      } catch (e) {
        // console.log(e);
        // create folder if it doesn't exist
        fs.mkdirSync(path.join(appDir, 'userStorage', userID), { recursive: true, force: true })
      }


    res.render('home', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role,
      home: true,
      userFiles: userFiles,
      linksFiles: linksFiles,
      userID: userID
    }) // render 'home'
  } catch (e) {

    if (loggingConsole) {
      console.log(`user undefiend in DB`);
      console.log(`redirect in "login"`);
    }
    // delete cookie
    res.clearCookie("tokenkey");
    res.redirect('/login')

  } // try/catch
} // module
