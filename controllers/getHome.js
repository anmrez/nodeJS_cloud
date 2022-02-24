const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  {appDir} = require('../lib/config.js')

  let userFiles = {}
  let linksFiles = []


module.exports = function (req, res) {
  console.log(`_____`);
  console.log(`get home:`);
  try {
    // проверка роли Админа
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
      console.log(`role: ${role}`);
    } else {
      role = false
      console.log(`role: ${role}`);
    }



    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user folder
    pathFiles = path.join(appDir, 'userStorage', userID)

      try {
        // write user files
        userFiles = fs.readdirSync(pathFiles, 'utf8')
        console.log(userFiles);
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
    // console.log(e);
    console.log(`user undefiend in DB`);
    res.clearCookie("tokenkey");

    res.redirect('/login')
  } // try/catch
} // module
