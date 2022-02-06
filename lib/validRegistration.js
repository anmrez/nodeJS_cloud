const pattern = require('../lib/patternServer.js'),
  sendCookie = require('../lib/sendCookie.js'),
  User = require('../models/users')



exports.severValidation = async function (req, res) {
  console.log(`ip: ${req.ip}`);
  console.log(`name: ${req.body.userName}`);
  console.log(`pass: ${req.body.password}`);
  if (pattern.nameJS.test(req.body.userName) && req.body.userName.length <= 16 && req.body.userName.length >= 2) { // validation check
    console.log(`valid`);
    const checkUser = await User.find({ name: req.body.userName })

    if (checkUser != 0) {
      res.redirect("/registration/?error=1")
    } else {

      const register = new User({
        name: req.body.userName,
        password: req.body.password
      }) // register
      await register.save()

      if (!req.cookies.token) { // если нет куки 'token' то создай
        sendCookie(req, res, 'token', req.body.userName, 24)
      };
      res.redirect("/")
    } // if (checkUser != 0)

  } else {
    res.status(412);
    res.render('error', {
      layout: 'error',
      codeError: 412,
      textError: `Введенные данные не соответсвую требованиям`
    });
  } // if (pattern.nameJS.test(req.body.userName))

} // module
