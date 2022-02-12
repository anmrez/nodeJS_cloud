const User = require('../models/users')

module.exports = async function (req, res) {
  const users = await User.find({}).lean()
  // console.log(req.query.error);
  try {
    res.render('login',{
      userName: jwt.verify(req.cookies.tokenkey, secret).name,
      users,
      errors: req.query.error,
    })

  } catch (e) {
    res.render('login',{
      users,
      errors: req.query.error,
    })
  }

}
