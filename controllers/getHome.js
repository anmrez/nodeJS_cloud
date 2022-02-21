const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  fs = require('fs'),
  path = require('path'),
  appDir = path.dirname(require.main.filename)

  let userFiles = {
    files: [
      `idididid`
    ],
    // id: ``
  }


module.exports = function (req, res) {
  console.log(`_____`);
  console.log(`get home:`);
  // console.log(`get:`);
  // console.log(req.body);
  try {
    // проверка роли Админа
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
    } else {
      role = false
    }




    userID = jwt.verify(req.cookies.tokenkey, secret).id
    pathFiles = path.join(appDir, 'userStorage', userID)
      console.log(userFiles);
      try {
        // filesArray = fs.readdirSync(pathFiles, 'utf8')
        // for (var i = 0; i < filesArray.length; i++) {
        //   userFiles.files[i] = {
        //     name: filesArray[i]
        //   }
        // }
        userFiles = fs.readdirSync(pathFiles, 'utf8')
        // userFiles.id = jwt.verify(req.cookies.tokenkey, secret).id
      } catch (e) {
        console.log(e);
      }



    console.log(userFiles);
    res.render('home', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      // userId: jwt.verify(req.cookies.tokenkey, secret).id,
      role: role,
      home: true,
      userFiles: userFiles
    }) // render 'home'
  } catch (e) {
    console.log(e);
    res.clearCookie("tokenkey");

    res.redirect('/login')
  }
}
