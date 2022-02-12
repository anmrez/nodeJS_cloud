const User = require('../models/users')

module.exports = async function (req, res) {
  const users = await User.find({}).lean()
  res.render('admin__page',{
    userName: req.cookies.token,
    users
  })

}
