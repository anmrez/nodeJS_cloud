const User = require('../models/users'),
  sendCookie = require('../lib/sendCookie.js'),
  generateToken = require('../lib/generateJWT.js'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  serverValidation = require('../lib/validRegistration.js'),
  {salt} = require('../lib/config.js')


module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`postLogin:`);
  console.log(req.body);
  if (serverValidation(req, res)) {

    const checkUser = await User.find({ name: req.body.userName })
    // console.log(`user:`);
    // console.log(checkUser[0]);
    // console.log(`______`);
    if (checkUser.length > 0) {


      if (!bcrypt.compareSync(req.body.password, checkUser[0].password)) {
        // `пароли не совпадают`
        res.redirect("/login/?error=2")
      } else {
        // `пароли совпадают`
        const token = generateToken(checkUser[0]._id, checkUser[0].name, checkUser[0].role)
        sendCookie(req, res, 'tokenkey', token, 0)
        res.redirect('/')
      } // if (!bcrypt.compareSync


    } else {
      res.redirect("/login/?error=1")
      console.log(`пользователь не найден`);
    } // if (checkUser.length > 0)


  } else {
    res.status(500);
    res.render('error', {
        layout: 'error',
        codeError: 500,
        textError: `ошибка на сервере`
      });
  } // if (serverValidation(req, res))
} // module
