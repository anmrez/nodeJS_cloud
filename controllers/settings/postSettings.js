const path = require('path'),
  pattern = require('../../lib/patternServer.js'),
  User = require('../../models/users'),

  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  {salt, secret, loggingConsole} = require(path.join('..', '..', 'lib', 'config.js')),

  consoleLog = require(path.join('..', '..', 'lib', 'loggingConsole.js')),
  updatetoken = require(path.join('..', '..', 'lib', 'updateTokenkey.js')),
  generateToken = require('../../lib/generateJWT.js')

module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)
  console.log(req.body);

  // смена имени
  if (req.body.userName)
  try {
    let newName = req.body.userName
    const oldName = await User.find({ name: jwt.verify(req.cookies.tokenkey, secret).name })
    const chechName = await User.find({ name: newName })

    // если пользователя с таким именем не найдено
    if (!chechName[0]) {
      // пользователь с таким именем не существует
      // смена имени на новое
      oldName[0].name = newName

      // создание нового ключа
      const newToken = generateToken(oldName[0]._id, oldName[0].name, oldName[0].role)

      // обновление куки
      updatetoken(req, res, jwt.verify(req.cookies.tokenkey, secret),newToken)

      // сохранине изменений
      await oldName[0].save()

      res.redirect('/settings/?error=3')

    } else {
      // пользователь с таким именем уже существует
      // отправить пользателю о том что такое имя уже есть
      invalidRender(4)
    }

  } catch (e) {
    console.log(e);
    // СДЕЛАТЬ РЕНДЕР ОШИБКИ
    res.redirect('/')

  }


  // смена пароля

  if (req.body.oldPassword || req.body.newPassword || req.body.confNewPassword)
  try {
    console.log(`смена пароля`);
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
    // СДЕЛАТЬ РЕНДЕР ОШИБКИ
    res.redirect('/')

  } // END try/catch



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
  } // invalidRender


} // module
