
// modules
const express = require('express'),
  app = express(),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  favicon = require('serve-favicon'),
  handlebars = require('express-handlebars').create({defaultLayout:'main', extname: '.hbs'});

// setting
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('view cache', false); // Кэширование
app.set('port', process.env.PORT || 3000);

app.use('/views/assets', express.static(__dirname + '/views/assets'));
app.use(favicon(path.join(__dirname,'views','assets','favicon.ico')));
app.use(cookieParser('9918fdas726536718sda27'))


// routing
// get-cookie page
app.get('/get-cookie', (req, res) => {
  res.render('get__cookie',{
    cookieName: req.cookies.token,
  })
})


// login page
app.get('/login', (req, res) => {
  res.render('login',{
    cookieName: req.cookies.token,
  })
})

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
app.post("/login", urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  // res.send(`${req.body.userName} - ${req.body.userAge}`);
  if (!req.cookies.token) {
    console.log('cookie "token"= undefined, create "token"');
    res.cookie('token', `${req.body.userName}`, {
      maxAge: 3600 * 60 * 60 * 6,
    })
    console.log(`token create: ${req.body.userName}`)
  }

  res.redirect("/")
});


// home page
app.get('/', (req, res) => {
  res.render('home',{
    cookieName: req.cookies.token,
  })
  // console.log(req.cookies.token)
  // if (!req.cookies.token) {
  //   console.log('cookie "token"= undefined, create "token"');
  //   res.cookie('token', `_ip=${req.ip};`, {
  //     maxAge: 3600 * 60 * 60 * 6,
  //   })
  //   console.log(`token create: _ip=${req.ip};`)
  // }
})

app.get('/', (req, res) => {
})


// page 404
app.use(function(req, response){
  response.status(404);
  response.render('404', { layout: '404' });
});



// listen
app.listen(app.get('port'), function(){
  console.log(`server started in http://127.0.0.1:${app.get('port')} Stop in CTRL + C`);
    console.log(`------------------------------------------------------`);
})
