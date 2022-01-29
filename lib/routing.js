const express = require('express'),
  router = express.Router(),
  logging = require('../lib/logging.js'),
  user = require('../models/users')

// routing  ========================
// get-cookie page
router.get('/get-cookie', async (req, res) => {
  const users = await user.find({}).lean()
  res.render('get__cookie',{
    cookieName: req.cookies.token,
    users
  })
})


// login page
router.get('/login', (req, res) => {
  res.render('login',{
    cookieName: req.cookies.token
  })
})

router.post("/login", function (req, res) {
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
// // END login page


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
