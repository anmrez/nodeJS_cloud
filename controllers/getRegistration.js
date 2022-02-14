const pattern = require('../lib/patternServer.js'),
  valid = require('../lib/validRegistration.js')


module.exports = function (req, res) {
  try {
    res.render('registration',{
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      patternName: pattern.name,
      patternPassword: pattern.pass,
    })
  } catch (e) {
    res.render('registration',{
      errors: req.query.error,
      patternName: pattern.name,
      patternPassword: pattern.pass,
    })
  }

  
} // module
