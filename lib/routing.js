const express = require('express'),
  router = express.Router(),
  logging = require('../lib/logging.js'),
  User = require('../models/users')

// routing  ========================
// get-cookie page
router.get('/get-cookie', async (req, res) => {
  const users = await User.find({}).lean()
  res.render('get__cookie',{
    cookieName: req.cookies.token,
    users
  })
})


// login page
router.get('/login', async (req, res) => {
  const users = await User.find({}).lean()
  // console.log(req.query.error);
  res.render('login',{
    cookieName: req.cookies.token,
    users,
    errors: req.query.error,
  })
}).post("/login", async function (req, res) {
  const checkUser = await User.find({ name: req.body.userName })
  if (checkUser.length > 0) {
    if (!req.cookies.token) { // если нет куки 'token' то создай
        // создание куки с значением в инпуте userName
        res.cookie('token', `${checkUser[0].name}`, {
            maxAge: 1000 * 60 * 60 * 24, // устнавливаеться 'жизнь' (24ч.)
            // signed: true
          });
          res.redirect("/") // Перенаправить на домашнюю страницу
        };
  } else {
    res.redirect("/login/?error=1")
    console.log(`пользователь не найден`);
  }



}); // app.post "/login"
// // END login page


router.get('/registration', (req, res) => {
  res.render('registration',{
    cookieName: req.cookies.token
  })
}).post("/registration", async (req, res) => {
  console.log(req.body.userName);
  const register = new User({
    name: req.body.userName
  })
  await register.save()
  if (!req.cookies.token) { // если нет куки 'token' то создай
      // создание куки с значением в инпуте userName
      res.cookie('token', `${req.body.userName}`, {
          maxAge: 1000 * 60 * 60 * 24, // устнавливаеться 'жизнь' (24ч.)
          // signed: true
        });
      };
  res.redirect("/")
})


// home page
router.get('/', (req, res) => {
  // logging.SetLogging(req)
  res.render('home',{
    cookieName: req.cookies.token,
  }) // render 'home'
}) // app.get '/'


// page 404
router.use(function(req, response){
  response.status(404);
  response.render('404', { layout: '404' });
});


// END routing

module.exports = router
