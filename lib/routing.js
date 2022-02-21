const express = require('express'),
  app = express(),
  router = express.Router(),
  // User = require('../models/users'),
  controller = require('../controllers/controller.js')



// routing  ========================
router.post('/upload', controller.postUpload)

router.get('/', controller.getHome)
.post('/', controller.postHome)

router.post('/unlogin', controller.unlogin)


router.get('/login', controller.getLogin)
.post("/login", controller.postLogin);


router.get('/registration', controller.getRegistration)
.post("/registration", controller.postRegistration) // post registration



router.get('/admin-page', controller.getAdminPage)


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
