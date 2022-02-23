const User = require('../models/users')

module.exports = async function (req, res) {
  const users = await User.find({}).lean()
  // res.render('admin__page',{
  //   userName: req.cookies.token,
  //   users
  // })

  try {
    // console.log(jwt.verify(req.cookies.tokenkey, secret));
    if ( `ADMIN` == jwt.verify(req.cookies.tokenkey, secret).role) {
      role = true
    } else {
      role = false
    }
    res.render('admin', {
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      role: role,
      users
    }) // render 'home'
  } catch (e) {
    // console.log(e);
    res.render('admin', {
      users
    }) // render 'home'
  }

}
