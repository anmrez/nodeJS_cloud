const pattern = require('../lib/patternServer.js'),
  sendCookie = require('../lib/sendCookie.js'),
  User = require('../models/users'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')


  // const generateToken = (id) => {
  //   const playLoad = {
  //     id
  //   }
  //   return jwt.sign(playLoad, secret, {expiresIn: '12h', algorithm: 'RS256'});;
  // }


exports.severValidation = async function (req, res) {
  // console.log(`ip: ${req.ip}`);
  console.log(`name: ${req.body.userName}`);


  const validName = pattern.nameJS.test(req.body.userName),
  validNameLength16 = req.body.userName.length <= 16,
  validNameLength2 = req.body.userName.length >= 2,
  resultValidName = validName && validNameLength16 && validNameLength2

  const validPass = pattern.passJS.test(req.body.password),
  validPassLenght128 = req.body.password.length <= 128,
  validPassLenght8 = req.body.password.length >= 8,
  resultValidPass = validPass && validPassLenght128 && validPassLenght8

  if (resultValidName && resultValidPass) { // validation check
    // console.log(`valid`);
    // console.log(`${validName} | ${validNameLength16} | ${validNameLength2}`);
    // console.log(`${validPass} | ${validPassLenght128} | ${validPassLenght8}`);
    const checkUser = await User.find({ name: req.body.userName })

    if (checkUser != 0) {
      res.redirect("/registration/?error=1")
    } else {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      salt = bcrypt.genSaltSync(2);

      // console.log(`pass: ${hash}`);
      const register = new User({
        name: req.body.userName,
        password: hash
      }) // register
      console.log(register._id);
      await register.save()
      // const token = generateToken(register.name)
      // console.log(token);


      // if (!req.cookies.token) { // если нет куки 'token' то создай
      //   sendCookie(req, res, 'token', req.body.userName, 24)
      // };



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

} // module
