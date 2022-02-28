const path = require('path')
  pattern = require('../../lib/patternServer.js'),
  valid = require('../../lib/validRegistration.js'),
  
  jwt = require('jsonwebtoken'),
  {secret, loggingConsole} = require('../../lib/config.js'),
  consoleLog = require('../../lib/loggingConsole.js')


module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)

  try {
    res.render('registration',{
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
    })
  } catch (e) {
    // console.log(e);
    res.render('registration',{
      errors: req.query.error,
      patternEmail: pattern.email,
      patternName: pattern.name,
      patternPassword: pattern.pass,
    })
  }


} // module
