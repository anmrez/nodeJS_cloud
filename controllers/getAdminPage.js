const User = require('../models/users'),
  jwt = require('jsonwebtoken'),
  {secret, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js')

module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  const users = await User.find({}).lean()
  try {
    // console.log(jwt.verify(req.cookies.tokenkey, secret));
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
    } else {
      role = false
    }
    res.render('admin', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role,
      users
    }) // render 'home'
  } catch (e) {
    // console.log(e);
    // res.render('admin', {
    //   users
    // }) // render 'home'
    res.redirect('/')

  } // try/catch

} // module
