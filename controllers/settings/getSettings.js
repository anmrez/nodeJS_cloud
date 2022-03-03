const path = require('path'),
  pattern = require('../../lib/patternServer.js'),
  jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require(path.join('..', '..', 'lib', 'config.js')),
  consoleLog = require(path.join('..', '..', 'lib', 'loggingConsole.js')),
  url = require('url'),
  validRole = require('../../lib/validRole.js')

module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)

  try {
    role = validRole(req, jwt.verify(req.cookies.tokenkey, secret).role)

    res.render('settings', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role,
      patternPassword: pattern.pass,
      error: req.query.error
    })

  } catch (e) {
    if (loggingConsole) {
      console.log(e);
    }
    res.redirect('/')
  } // try/catch

} // module
