const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  {appDir} = require('../lib/config.js'),
  path = require('path');



module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`download:`);
  try {
    // get user ID
    userID = jwt.verify(req.cookies.tokenkey, secret).id
    // find path in user file
    const file = path.join(appDir, 'userStorage', userID, req.query.file)
    // download file
    res.download(file); // Set disposition and send it.

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
