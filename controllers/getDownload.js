const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js'),
  {appDir} = require('../lib/config.js'),
  path = require('path');



module.exports = async function (req, res) {
  console.log(`______`);
  console.log(`download:`);
  try { // try #1
    try { // try #2

      // get user id if token exists
      userID = jwt.verify(req.cookies.tokenkey, secret).id
      // find path in user file
      const file = path.join(appDir, 'userStorage', userID, req.query.file)
      // download file
      res.download(file); // send file

      // try #2
    } catch (e) {

      arr = req.query.file.split('?')
      req.query.id = arr[1].split('=')[1]
      req.query.file = arr[0]
      // find path in user file
      const file = path.join(appDir, 'userStorage', req.query.id, req.query.file)
      // download file
      res.download(file); // send file

    } // try/catch

    // try #1
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
