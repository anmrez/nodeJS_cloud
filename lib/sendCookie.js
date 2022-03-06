const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')

module.exports = function (req, res, key, value, life){
  let expiresIn = jwt.verify(value, secret).exp
  if (life) {
    res.cookie(key, value, {
      // maxAge: (1000 * 60 * 60) * life, // устнавливаеться 'жизнь' (1ч.)
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });
  } else {
    res.cookie(key, value, {
      // httpOnly: true,
      httpOnly: false,
      // secure: true,
      secure: false,
    });
  }

} // module
