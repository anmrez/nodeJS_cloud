
// modules
const express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  fs = require('fs'),
  path = require('path'),
  favicon = require('serve-favicon'),
  bodyParser = require('body-parser'),
  routes = require('./lib/routing.js'),
  mongoose = require('mongoose'),
  config = require('./lib/config.js'),
  fileUpload = require('express-fileupload');



// setting
  // handlebars


  app.set('view engine', 'pug');
  app.set('view cache', false); // Кэширование handlebars (вкл. при хостинге!)

  // END handlebars


app.set('port', process.env.PORT || 3000);
app.use(express.json())
app.use('/views/assets', express.static(__dirname + '/views/assets'));
app.use(favicon(path.join(__dirname,'views','assets','favicon.ico')));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('9918fdas726536718sda27'))

app.use(fileUpload({}));
// END setting


app.use(routes)



// stating server
async function start(){
  try {
    await mongoose.connect(config.url, {
      useNewUrlParser: true
    })
    app.listen(app.get('port'), function(){
      console.log(`server started in http://127.0.0.1:${app.get('port')} Stop in CTRL + C`);
        console.log(`------------------------------------------------------`);
      })
  } catch (e) {
    console.log(e);
  }
}
start()
