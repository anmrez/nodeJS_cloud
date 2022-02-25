const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  {appDir} = require('../lib/config.js'),
  path = require('path'),
  fs = require('fs')



module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`delete file:`);
  try {
    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user file
    const file = path.join(appDir, 'userStorage', userID, req.query.file)
    console.log(`file: '${req.query.file}' delete`);
    // delete file
    fs.unlinkSync(file);
    // redirect home
    res.redirect('/')

  } catch (e) {
    console.log(e);
    res.status(404);
    res.render('error', {
      layout: 'error',
      codeError: 404,
      textError: `файл не найден`
    });
  } // try/catch

} // module
