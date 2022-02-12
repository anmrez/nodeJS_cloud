const User = require('../models/users'),
  sendCookie = require('../lib/sendCookie.js'),
  generateToken = require('../lib/generateJWT.js')


module.exports = async function (req, res) {
  const checkUser = await User.find({ name: req.body.userName })
  if (checkUser.length > 0) {
    console.log(`role: ${checkUser[0].role}`);
    const token = generateToken(checkUser[0]._id, checkUser[0].name, checkUser[0].role)

    sendCookie(req, res, 'tokenkey', token, 0)

    // res.cookie('tokenkey', token)
  } else {
    res.redirect("/login/?error=1")
    console.log(`пользователь не найден`);
  }
  res.redirect('/')

}
