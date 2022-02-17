

module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`post home:`);
  console.log(req.body);
  res.redirect('/')
}
