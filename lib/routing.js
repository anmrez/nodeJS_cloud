const express = require('express'),
  app = express(),
  router = express.Router(),
  logging = require('../lib/logging.js'),
  User = require('../models/users'),
  sendCookie = require('../lib/sendCookie.js'),
  pattern = require('../lib/patternServer.js'),
  valid = require('../lib/validRegistration.js'),
  jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')

  const generateToken = (id) => {
    const payLoad = {
      id
    }
    return jwt.sign(payLoad, secret);
    // return jwt.sign(payLoad, secret, {expiresIn: '12h', algorithm: 'RS256'});
  }

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

    // console.log(`checkUser._id: ${checkUser[0]._id}`);
    // console.log(`checkUser.name: ${checkUser[0].name}`);
    const token = generateToken(checkUser.name)
    req.headers.token = token
    console.log(`token: ${req.headers.token}`);
    res.cookie('tokenkey', token)
  } else {
    res.redirect("/login/?error=1")
    console.log(`пользователь не найден`);
  }
  res.redirect('/')


}); // app.post "/login"
// // END login page


router.get('/registration', (req, res) => {
  res.render('registration',{
    cookieName: req.cookies.token,
    errors: req.query.error,
    patternName: pattern.name,
    patternPassword: pattern.pass,
  })
}).post("/registration", async (req, res) => {
  valid.severValidation(req, res)


}) // post registration


// home page
router.get('/', (req, res) => {
  // logging.SetLogging(req)
  console.log(`token: ${req.headers.token}`);
  res.render('home',{
    cookieName: req.cookies.token,
  }) // render 'home'
}) // app.get '/'


// page 404
router.use(function(req, res){
  res.status(404);
  res.render('error', {
    layout: 'error',
    codeError: 404,
    textError: `Страница не найдена`
  });
});


// END routing

module.exports = router
