const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')

module.exports = function (id, name, role) {
    // console.log(`id: ${id}`);
    const payLoad = { id, name, role }
    return jwt.sign(payLoad, secret, {expiresIn: '24h'});
    // return jwt.sign(payLoad, secret, {expiresIn: '12h', algorithm: 'RS256'});
  }
