const express = require('express'),
  app = express(),
  router = express.Router(),
  User = require('../models/users')


const getHomePage = require('../controllers/getHomePage.js'),
  getLoginPage = require('../controllers/getLoginPage.js'),
  postLoginPage = require('../controllers/postLoginPage.js'),
  getRegistration = require('../controllers/getRegistration.js'),
  postRegistration = require('../controllers/postRegistration.js')


// routing  ========================


router.get('/', getHomePage)


router.get('/login', getLoginPage)
.post("/login", postLoginPage);


router.get('/registration', getRegistration)
.post("/registration", postRegistration) // post registration



router.get('/get-cookie', async (req, res) => {
  const users = await User.find({}).lean()
  res.render('get__cookie',{
    userName: req.cookies.token,
    users
  })
})


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
