const pattern = require('../lib/patternServer.js'),
  sendCookie = require('../lib/sendCookie.js'),
  User = require('../models/users'),
  bcrypt = require('bcryptjs'),
  generateToken = require('../lib/generateJWT.js'),
  serverValidation = require('../lib/validRegistration.js'),
  // {salt} = require('../lib/config.js'),
  {salt, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js'),
  fs = require('fs'),
  path = require('path')


module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  // проверка валидации форм
  if (serverValidation(req, res)) { // validation check
    try {
      const checkUser = await User.find({ name: req.body.userName })

      // проверка на существования пользователя с таким же именем
      if (checkUser != 0) {
        res.redirect("/registration/?error=1")
      } else {

        // haching password
        let hash = bcrypt.hashSync(req.body.password, salt);
        // ввод данных с клбента в БД
        const register = new User({
          email: req.body.email,
          name: req.body.userName,
          password: hash,
          role: `USER`
        }) // register

        // создание ключа
        const token = generateToken(register._id, register.name, register.role)

        // создание куки с ключем (срок зависит от кнопки "remeber me")
        if (req.body.rememberUser) {
          sendCookie(req, res, 'tokenkey', token, true)
        } else {
          sendCookie(req, res, 'tokenkey', token, false)
        }


        // сохранить пользователя в БД
        await register.save()
        res.redirect("/")
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      res.render('error', {
        layout: 'error',
        codeError: 500,
        textError: `ошибка сервера`
      });
    }
    // } // if (checkUser != 0)

    // проверка валидации форм (если не прошла)
  } else {
    res.status(412);
    res.render('error', {
      layout: 'error',
      codeError: 412,
      textError: `Введенные данные не соответсвую требованиям`
    });
  } // if (pattern.nameJS.test(req.body.userName))


} // module
