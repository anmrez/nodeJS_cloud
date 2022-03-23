 const path = require('path')

const getHome = require(path.join('..', 'controllers', 'getHome.js')),
  postHome = require(path.join('..', 'controllers', 'postHome.js')),

  // files
  postUpload = require(path.join('..', 'controllers', 'files', 'postUpload.js')),
  getDownload = require(path.join('..', 'controllers', 'files', 'getDownload.js')),
  getDeleteFile = require(path.join('..', 'controllers', 'files', 'getDeleteFile.js')),

  // login
  getLogin = require(path.join('..', 'controllers', 'login', 'getLogin.js')),
  postLogin = require(path.join('..', 'controllers', 'login', 'postLogin.js')),
  unlogin = require(path.join('..', 'controllers', 'login', 'unlogin.js')),

  // registration
  getRegistration = require(path.join('..', 'controllers', 'registration', 'getRegistration.js')),
  postRegistration = require(path.join('..', 'controllers', 'registration', 'postRegistration.js')),

  // adminPage
  getAdminPage = require(path.join('..', 'controllers', 'getAdminPage.js')),
  postDeleteUser = require(path.join('..', 'controllers', 'postDeleteUser.js'))

  // settings
  getSettings = require(path.join('..', 'controllers', 'settings', 'getSettings.js'))
  postSettings = require(path.join('..', 'controllers', 'settings', 'postSettings.js'))


// home
exports.getHome = getHome
exports.postHome = postHome

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

// settings
exports.getSettings = getSettings
exports.postSettings = postSettings
