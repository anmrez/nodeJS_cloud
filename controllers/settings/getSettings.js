const path = require('path'),
  jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require(path.join('..', '..', 'lib', 'config.js')),
  consoleLog = require(path.join('..', '..', 'lib', 'loggingConsole.js'))

module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)

  try {
    res.render('settings', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: jwt.verify(req.cookies.tokenkey, secret).role,
    })
  } catch (e) {
    if (loggingConsole) {
      console.log(e);

    }
    res.redirect('/')
  }

} // module
