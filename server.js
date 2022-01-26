
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
app.set('view cache', false); // Кэширование handlebars (вкл. при хостинге!)
app.set('port', process.env.PORT || 3000);

app.use('/views/assets', express.static(__dirname + '/views/assets'));
app.use(favicon(path.join(__dirname,'views','assets','favicon.ico')));
app.use(cookieParser('9918fdas726536718sda27'))


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
    })

    console.log(`token create: '${req.body.userName}'`)
  }

  res.redirect("/") // Перенаправить на домашнюю страницу
}); // app.post "/login"
// END login page


// home page
app.get('/', (req, res) => {
  res.render('home',{
    cookieName: req.cookies.token,
  }) // render 'home'
}) // app.get '/'


// app.post("/", urlencodedParser, function (req, res) {
//   // console.log(req.body);
//   if (req.body.UserExit == 'exit') {
//     res.clearCookie("token")
//   }
//
//   res.redirect('/')
// })
// END home page


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
