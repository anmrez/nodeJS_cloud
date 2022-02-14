const jwt = require('jsonwebtoken'),
  {secret} = require('../lib/config.js')

module.exports = function (req, res, key, value, life){
  let expiresIn = jwt.verify(value, secret).exp
  try {
    console.log(jwt.decode(value));
  } catch (e) {
    console.log(e);
  }
  if (life) {
    res.cookie(key, value, {
      // maxAge: (1000 * 60 * 60) * life, // устнавливаеться 'жизнь' (1ч.)
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });
  } else {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
    });
  }

} // module
