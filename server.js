
// modules
const express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  fs = require('fs'),
  path = require('path'),
  favicon = require('serve-favicon'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  routes = require('./lib/routing.js'),
  mongoose = require('mongoose'),
  config = require('./lib/config.js')
  // session = require('express-session'),
  // MemoryStore = require('memorystore')(session)
  // RedisStorage = require('connect-redis')(session),
  // redis = require('redis'),
  // client = redis.createClient();


// setting
  // handlebars
  const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
  })
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('view cache', false); // Кэширование handlebars (вкл. при хостинге!)
  // END handlebars


app.set('port', process.env.PORT || 3000);
app.use(express.json())
app.use('/views/assets', express.static(__dirname + '/views/assets'));
app.use(favicon(path.join(__dirname,'views','assets','favicon.ico')));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('9918fdas726536718sda27'))

// END setting


app.use(routes)




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
