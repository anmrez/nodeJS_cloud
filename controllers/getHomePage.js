jwt = require('jsonwebtoken'),
{secret} = require('../lib/config.js')

module.exports = function (req, res) {
  try {
    res.render('home', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,

    }) // render 'home'
  } catch (e) {
    // console.log(e);
    res.render('home') // render 'home'
  }
}
