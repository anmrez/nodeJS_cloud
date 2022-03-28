const jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../../lib/config.js'),
  consoleLog = require('../../lib/loggingConsole.js'),
  path = require('path');

module.exports = async function (req, res) {
  let file
  consoleLog(req, res, loggingConsole)
  console.log(req.query);


  try { // try #1
    try { // try #2


      // get user id if token exists
      userID = jwt.verify(req.cookies.tokenkey, secret).id

      // find path in user file
      if (req.query.folder) {
        file = path.join( appDir, 'userStorage', userID, req.query.folder, req.query.file )
      } else {
        file = path.join( appDir, 'userStorage', userID, req.query.file )
      }

      res.download(file); // send file

      // try #2
    } catch (e) {

      if (req.query.folder) {
        file = path.join(appDir, 'userStorage', req.query.id, req.query.folder, req.query.file)
      } else {
        file = path.join(appDir, 'userStorage', req.query.id, req.query.file)
      }
      // download file
      // res.download(file); // send file
      res.download(file, function(error){
        if (error) {
          res.status(404);
          res.render('error', {
            layout: 'error',
            codeError: 404,
            textError: `файл не найден`
          });
        } else {
          res.redirect('/')
        }

      }) // END res.file

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
