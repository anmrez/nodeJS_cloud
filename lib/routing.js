const express = require('express'),
  // app = express(),
  router = express.Router(),
  controller = require('../controllers/controller.js')


// routing  ========================

// home page
router.get('/', controller.getHome)
// .post('/', controller.postHome)


// login
router.get('/login', controller.getLogin)
.post("/login", controller.postLogin);
router.post('/unlogin', controller.unlogin)

// registration
router.get('/registration', controller.getRegistration)
.post("/registration", controller.postRegistration) // post registration

// files
router.post('/upload', controller.postUpload)
router.get('/download', controller.getDownload);
router.get('/delete-file', controller.getDeleteFile);

// admin
router.get('/admin-page', controller.getAdminPage)
router.post('/deleteUser', controller.postDeleteUser)

//settings
router.get('/settings', controller.getSettings)
.post('/settings', controller.postSettings)

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
