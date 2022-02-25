const getHome = require('../controllers/getHome.js'),
  unlogin = require('../controllers/unlogin.js'),
  // files
  getDownload = require('../controllers/getDownload.js'),
  postUpload = require('../controllers/postUpload.js'),
  getDeleteFile = require('../controllers/getDeleteFile.js'),
  // login
  getLogin = require('../controllers/getLogin.js'),
  postLogin = require('../controllers/postLogin.js'),
  // registration
  getRegistration = require('../controllers/getRegistration.js'),
  postRegistration = require('../controllers/postRegistration.js'),
  // adminPage
  getAdminPage = require('../controllers/getAdminPage.js'),
  postDeleteUser = require('../controllers/postDeleteUser.js')



exports.getHome = getHome

// files
exports.postUpload = postUpload
exports.getDownload = getDownload
exports.getDeleteFile = getDeleteFile

// login
exports.getLogin = getLogin
exports.postLogin = postLogin
exports.unlogin = unlogin

// registration
exports.getRegistration = getRegistration
exports.postRegistration = postRegistration

// admin
exports.getAdminPage = getAdminPage
exports.postDeleteUser = postDeleteUser
