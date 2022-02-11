const User = require('../models/users'),
  sendCookie = require('../lib/sendCookie.js')

const generateToken = (id, name) => {
  // console.log(`id: ${id}`);
  const payLoad = { id, name }
  return jwt.sign(payLoad, secret, {expiresIn: '2h'});
  // return jwt.sign(payLoad, secret, {expiresIn: '12h', algorithm: 'RS256'});
}


module.exports = async function (req, res) {
  const checkUser = await User.find({ name: req.body.userName })
  if (checkUser.length > 0) {

    const token = generateToken(checkUser[0]._id, checkUser[0].name)

    sendCookie(req, res, 'tokenkey', token, 0)

    // res.cookie('tokenkey', token)
  } else {
    res.redirect("/login/?error=1")
    console.log(`пользователь не найден`);
  }
  res.redirect('/')

}
