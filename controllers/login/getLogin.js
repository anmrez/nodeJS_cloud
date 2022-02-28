const User = require('../../models/users.js'),
  pattern = require('../../lib/patternServer.js'),
  bcrypt = require('bcryptjs'),
  {loggingConsole} = require('../../lib/config.js'),
  consoleLog = require('../../lib/loggingConsole.js')

module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  const users = await User.find({}).lean()
  // console.log(req.query.error);
  try {
    res.render('login',{
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
    })
  } catch (e) {
    res.render('login',{
      users,
      errors: req.query.error,
      patternName: pattern.name,
      patternPassword: pattern.pass,
    })
  } // catch

} // module
