const User = require('../models/users'),
  sendCookie = require('../lib/sendCookie.js'),
  generateToken = require('../lib/generateJWT.js'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  serverValidation = require('../lib/validRegistration.js'),
  // {salt} = require('../lib/config.js')
  {salt, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js')


module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  // если форма прошла проверку
  if (serverValidation(req, res)) {

    // проверка существования пользователя в БД
    const checkUser = await User.find({ name: req.body.userName })
    // если пользователь найден
    if (checkUser.length > 0) {

      // проверка паролей на совпадение
      if (!bcrypt.compareSync(req.body.password, checkUser[0].password)) {
        // `пароли не совпадают`
        res.redirect("/login/?error=2")
      } else {
        // `пароли совпадают`
          const token = generateToken(checkUser[0]._id, checkUser[0].name, checkUser[0].role)
        // создание куки с токеном (длительность зависит от чекбокса)
          if (req.body.rememberUser) {
            sendCookie(req, res, 'tokenkey', token, true)
          } else {
            sendCookie(req, res, 'tokenkey', token, false)
          }
          res.redirect('/')
      } // if "!bcrypt.compareSync"

    // если пользователь не найден
    } else {
      res.redirect("/login/?error=1")
      console.log(`пользователь не найден`);
    } // if (checkUser.length > 0)

    // если форма не прошла проверку
  } else {
    res.status(500);
    res.render('error', {
        layout: 'error',
        codeError: 500,
        textError: `Форма не прошла проверку(возможно вы ввели недопустимый символ)`
      });
  } // if (serverValidation(req, res))
} // module
