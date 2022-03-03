const path = require('path'),
  pattern = require('../../lib/patternServer.js'),
  User = require('../../models/users'),

  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  {salt, secret, loggingConsole} = require(path.join('..', '..', 'lib', 'config.js')),

  consoleLog = require(path.join('..', '..', 'lib', 'loggingConsole.js'))

module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  try {
    const user = await User.find({ name: jwt.verify(req.cookies.tokenkey, secret).name })

    // проверка старого пароля и текущего
    if (!bcrypt.compareSync(req.body.oldPassword, user[0].password)) {
      // `старый и текущий пароли не совпадают`
      invalidRender(1)

    } else {
      // `старый и текущий пароли совпадают`

      // проверка новых паролей на совпадение
      if (req.body.confNewPassword == req.body.newPassword) {
        // новые пароли совпадают
        // замена пароля в БД
        // хэштрование нового пароля
        let hash = bcrypt.hashSync(req.body.newPassword, salt);
        // замена пароля
        user[0].password = hash
        // сохранить изменение
        await user[0].save()
        // переадресация 'success'
        res.redirect('/settings/?error=0')

      } else {
        // новые пароли не совпадают
        invalidRender(2)

      } // END проверка новых паролей


    } // END проверка старого пароля и текущего

  } catch (e) {
    console.log(e);
    res.redirect('/')

  }



  function invalidRender(err){
    res.render('settings', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: jwt.verify(req.cookies.tokenkey, secret).role,
      patternPassword: pattern.pass,
      error: err,
      oldPass: req.body.oldPassword,
      newPass: req.body.newPassword,
      confNewPass: req.body.confNewPassword,
    })
  }
} // module
