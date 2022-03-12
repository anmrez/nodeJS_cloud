const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')

module.exports = function (req, res, oldToken, newToken){
  res.cookie('tokenkey', newToken, {
    maxAge: oldToken.exp,
    httpOnly: true,
    secure: true,
  });
} // module
