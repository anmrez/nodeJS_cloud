const getHome = require('../controllers/getHome.js'),
  getDownload = require('../controllers/getDownload.js'),
  postUpload = require('../controllers/postUpload.js'),
  unlogin = require('../controllers/unlogin.js'),
  // login
  getLogin = require('../controllers/getLogin.js'),
  postLogin = require('../controllers/postLogin.js'),
  // registration
  getRegistration = require('../controllers/getRegistration.js'),
  postRegistration = require('../controllers/postRegistration.js'),
  // adminPage
  getAdminPage = require('../controllers/getAdminPage.js'),
  // user
  postDeleteUser = require('../controllers/postDeleteUser.js')



exports.postUpload = postUpload
exports.postDeleteUser = postDeleteUser
exports.getHome = getHome

exports.getDownload = getDownload
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
