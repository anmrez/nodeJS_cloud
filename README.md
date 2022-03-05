
# Config #
1) create lib/config.js
2) const bcrypt = require('bcryptjs'),
  path = require('path')

module.exports = {
  url: '', ***// url mongoDB***
  secret: '', ***key jwt***
  salt: bcrypt.genSaltSync(x), ***// bcrypt salt***
  appDir: path.dirname(require.main.filename), ***// site root directory ***
  loggingConsole: true, ***// logging in console***
}
