const getHome = require('../controllers/getHome.js'),
  postHome = require('../controllers/postHome.js'),
  unlogin = require('../controllers/unlogin.js'),
  // login
  getLogin = require('../controllers/getLogin.js'),
  postLogin = require('../controllers/postLogin.js'),
  // registration
  getRegistration = require('../controllers/getRegistration.js'),
  postRegistration = require('../controllers/postRegistration.js'),
  // adminPage
  getAdminPage = require('../controllers/getAdminPage.js')




exports.getHome = getHome
exports.postHome = postHome
// unlogin
exports.unlogin = unlogin
// login
exports.getLogin = getLogin
exports.postLogin = postLogin
// registration
exports.getRegistration = getRegistration
exports.postRegistration = postRegistration
// adminPage
exports.getAdminPage = getAdminPage
