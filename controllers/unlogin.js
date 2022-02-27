const {secret, appDir, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js')


module.exports = function (req, res) {
  consoleLog(req, res, loggingConsole)
  res.clearCookie("tokenkey");
  res.redirect('/')
}
