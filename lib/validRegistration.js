const pattern = require('../lib/patternServer.js')

module.exports = function (req, res){
  const validMail = pattern.emailJS.test(req.body.userName)

  const validName = pattern.nameJS.test(req.body.userName),
  validNameLength16 = req.body.userName.length <= 16,
  validNameLength2 = req.body.userName.length >= 2,
  resultValidName = validName && validNameLength16 && validNameLength2

  const validPass = pattern.passJS.test(req.body.password),
  validPassLenght128 = req.body.password.length <= 128,
  validPassLenght8 = req.body.password.length >= 8,
  resultValidPass = validPass && validPassLenght128 && validPassLenght8

  console.log(`vaild mail:` + validMail);
  return (resultValidName && resultValidPass)

}
