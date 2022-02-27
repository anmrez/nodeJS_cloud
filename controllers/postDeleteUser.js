const User = require('../models/users'),
  fs = require('fs'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js'),
  path = require('path'),
  jwt = require('jsonwebtoken')


module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)


  try {
    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user folder
    userFiles = path.join(appDir, 'userStorage', userID)
    // delete user folder
    fs.rmSync(userFiles, { recursive: true, force: true });
    // delete user
    const deleteUser = await User.find({ _id: req.body.delete }).deleteOne()
  } catch (e) {
    console.log(e);
    res.status(500);
    res.render('error', {
      layout: 'error',
      codeError: 500,
      textError: `ошибка при удалении пользователя`
    });
  } finally {

    res.redirect('/admin-page')
  } // try/catch

} // module
