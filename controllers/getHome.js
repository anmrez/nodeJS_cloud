const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  consoleLog = require('../lib/loggingConsole.js'),
  validRole = require('../lib/validRole.js')

  let userFiles = {}
  let linksFiles = []


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
        // write user files
        userFiles = fs.readdirSync(pathFiles, 'utf8')
        // console.log(userFiles);
      } catch (e) {
        // console.log(e);
        // create folder if it doesn't exist
        fs.mkdirSync(path.join(appDir, 'userStorage', userID), { recursive: true, force: true })
      } // try/catch #2



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
      console.log(e);
      console.log(`user undefiend in DB`);
      console.log(`redirect in "login"`);
    }
    // delete cookie
    res.clearCookie("tokenkey");
    res.redirect('/login')

  } // try/catch #1
} // module
