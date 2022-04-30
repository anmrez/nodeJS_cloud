const fs = require('fs'),
  path = require('path'),
  jwt = require('jsonwebtoken'),
  {secret, appDir, loggingConsole} = require('../lib/config.js'),
  consoleLog = require('../lib/loggingConsole.js')
  var http = require('http')


module.exports = async function (req, res) {
  consoleLog(req, res, loggingConsole)
  console.log(`______`);
  console.log(req.body);
  let userID, filePath, stat
  let responseXHR = 'error'


  try {

    userID = jwt.verify(req.cookies.tokenkey, secret).id



    // определяем путь к файлу
    if ( req.body.path == '/' ) {

      filePath = path.join( appDir, 'userStorage', userID, req.body.oldName )
      filePathNew = path.join( appDir, 'userStorage', userID, req.body.newName )

    } else {

      filePath = path.join( appDir, 'userStorage', userID, req.body.path, req.body.oldName )
      filePathNew = path.join( appDir, 'userStorage', userID, req.body.path, req.body.newName )

    }
    console.log( `filePath: ` + filePath );
    console.log( `filePath: ` + filePathNew );




    try {

      stat = fs.statSync( filePath );
      // console.log( stat );

    } catch (e) {

      console.log( `file undefiend` );

    }


    switch ( req.body.operation ) {
      case 'Create new folder':

        try {

          // создаем папку
          fs.mkdirSync( filePathNew, { recursive: true, force: true } )
          res.json( 'success' )

        } catch (e) {

          res.json( e )

        }

        break;


      case 'Rename':

      fs.rename( filePath, filePathNew, ( err ) => {

        if ( err ) {

          console.log( err );
          res.json( responseXHR )

        } else {

          console.log( `renamed: `);
          console.log( filePath );
          console.log( filePathNew );
          res.json('success')

        }

      })

        break; // END Rename


      case 'Move':

      // NOT WORKED

        break;


      case 'Download':

        // let readStream = fs.createReadStream(filePath);
        // readStream.pipe( res )

        res.download( filePath )

        break;


      case 'Copy':

      // NOT WORKED

        break;


      case 'Delete':
      responseXHR = 'error'

      try {

        fs.rmSync( filePath, { recursive: true, force: true });
        responseXHR = 'success'

      } catch (e) {

        fs.unlink( filePath, ( err ) =>{

          console.log( err );

        })

        responseXHR = 'success'

      }

      res.json( responseXHR )

      // END `Delete`
        break;



      default:
      console.log( `default err` );
      res.json( 'error' )

    }



  } catch (e) {

    console.log(e);

  }
  
// END module
}
