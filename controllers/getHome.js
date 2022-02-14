jwt = require('jsonwebtoken'),
{secret} = require('../lib/config.js')

module.exports = function (req, res) {
  // console.log(`get:`);
  // console.log(req.body);
  try {
    // console.log(jwt.verify(req.cookies.tokenkey, secret));
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
    } else {
      role = false
    }
    res.render('home', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role
    }) // render 'home'
  } catch (e) {
    res.clearCookie("tokenkey");
    // console.log(e);
    res.render('home') // render 'home'
  }
}
