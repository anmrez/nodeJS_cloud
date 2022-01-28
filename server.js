
// modules
const express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  fs = require('fs'),
  path = require('path'),
  favicon = require('serve-favicon'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  logging = require('./lib/logging.js')
  // mongo = require('mongodb').MongoClient
  // redisStorage = require('connect-redis')(session)
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
// session

app.use(
  session({
    resave: true,
    secret: 'you secret key',
    saveUninitialized: true,
    // cookie: {
    //   signed: 'strick'
    // }
  })
)



// END session
// routing  ========================


// get-cookie page
app.get('/get-cookie', (req, res) => {
  res.render('get__cookie',{
    cookieName: req.cookies.token,
  })
})


// login page
app.get('/login', (req, res) => {
  res.render('login',{
    cookieName: req.cookies.token
  })
})

// ответ из формы
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
app.post("/login", urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  if (!req.cookies.token) { // если нет куки 'token' то создай
    console.log('cookie "token"= undefined, create "token"');

    // создание куки с значением в инпуте userName
    res.cookie('token', `${req.body.userName}`, {
      maxAge: 1000 * 60 * 60 * 24, // устнавливаеться 'жизнь' (24ч.)
      // signed: true
    });

    console.log(`token create: '${req.body.userName}'`)
  };

  res.redirect("/") // Перенаправить на домашнюю страницу
}); // app.post "/login"
// END login page


// home page
app.get('/', (req, res) => {
  res.render('home',{
    cookieName: req.cookies.token,
  }) // render 'home'
}) // app.get '/'


// page 404
app.use(function(req, response){
  response.status(404);
  response.render('404', { layout: '404' });
});


// END routing
// listen


app.listen(app.get('port'), function(){
  console.log(`server started in http://127.0.0.1:${app.get('port')} Stop in CTRL + C`);
    console.log(`------------------------------------------------------`);
})


// END listen
