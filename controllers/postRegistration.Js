const pattern = require('../lib/patternServer.js'),
  sendCookie = require('../lib/sendCookie.js'),
  User = require('../models/users'),
  bcrypt = require('bcryptjs'),
  generateToken = require('../lib/generateJWT.js'),
  serverValidation = require('../lib/validRegistration.js'),
  {salt} = require('../lib/config.js')


module.exports = async function (req, res) {
  // serverValidation(req, res)

  if (serverValidation(req, res)) { // validation check
    // console.log(`${validName} | ${validNameLength16} | ${validNameLength2}`);
    // console.log(`${validPass} | ${validPassLenght128} | ${validPassLenght8}`);
    const checkUser = await User.find({ name: req.body.userName })

    if (checkUser != 0) {
      res.redirect("/registration/?error=1")
    } else {

      //haching password
      let hash = bcrypt.hashSync(req.body.password, salt);

      // console.log(`pass: ${hash}`);
      const register = new User({
        name: req.body.userName,
        password: hash,
        role: `USER`
      }) // register
      // console.log(register._id);
      await register.save()


      const token = generateToken(register._id, register.name, register.role)
      if (req.body.rememberUser) {
        sendCookie(req, res, 'tokenkey', token, true)
      } else {
        sendCookie(req, res, 'tokenkey', token, false)
      }




      res.redirect("/")
    } // if (checkUser != 0)

  } else {
    // console.log(`${validName} | ${validNameLength16} | ${validNameLength2}`);
    // console.log(`${validPass} | ${validPassLenght128} | ${validPassLenght8}`);
    res.status(412);
    res.render('error', {
      layout: 'error',
      codeError: 412,
      textError: `Введенные данные не соответсвую требованиям`
    });
  } // if (pattern.nameJS.test(req.body.userName))


}
