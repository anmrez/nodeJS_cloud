const getHome = require('../controllers/getHome.js'),
  // login
  getLogin = require('../controllers/getLogin.js'),
  postLogin = require('../controllers/postLogin.js'),
  // registration
  getRegistration = require('../controllers/getRegistration.js'),
  postRegistration = require('../controllers/postRegistration.js'),
  // adminPage
  getAdminPage = require('../controllers/getAdminPage.js')




exports.getHome = getHome
// login
exports.getLogin = getLogin
exports.postLogin = postLogin
// registration
exports.getRegistration = getRegistration
exports.postRegistration = postRegistration
// adminPage
exports.getAdminPage = getAdminPage
