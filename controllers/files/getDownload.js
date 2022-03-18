const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../../lib/config.js'),
  consoleLog = require('../../lib/loggingConsole.js'),
  path = require('path');

module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)

  try { // try #1
    try { // try #2


      // get user id if token exists
      userID = jwt.verify(req.cookies.tokenkey, secret).id
      // find path in user file
      const file = path.join(appDir, 'userStorage', userID, req.query.file)

      // if the user is in the system and downloads the file from the link
      if (  file.split('?').length == 2 ) {
        // download file
        res.download(file.split('?')[0]); // send file
      } else {
        // download file
        res.download(file); // send file
      }


      // try #2
    } catch (e) {


      arr = req.query.file.split('?')
      req.query.id = arr[1].split('=')[1]
      req.query.file = arr[0]
      // find path in user file
      const file = path.join(appDir, 'userStorage', req.query.id, req.query.file)
      // download file
      res.download(file); // send file


    } // END try/catch #2


    // try #1
  } catch (e) {
    console.log(`err try#1`);
    console.log(e);
    res.status(404);
    res.render('error', {
      layout: 'error',
      codeError: 404,
      textError: `файл не найден`
    });
  } // END try/catch #1

} // module
