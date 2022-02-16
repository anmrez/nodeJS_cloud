const pattern = require('../lib/patternServer.js'),
  valid = require('../lib/validRegistration.js')


module.exports = function (req, res) {
  console.log(`______`);
  console.log(`get registration:`);
  try {
    res.render('registration',{
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
    })
  } catch (e) {
    res.render('registration',{
      errors: req.query.error,
      patternEmail: pattern.email,
      patternName: pattern.name,
      patternPassword: pattern.pass,
    })
  }


} // module
