
module.exports = function (req, res) {
  res.clearCookie("tokenkey");
  res.redirect('/')
}
