module.exports = function (req, res, key, value, life){
  if (life > 0) {
    res.cookie(key, value, {
      maxAge: (1000 * 60 * 60) * life, // устнавливаеться 'жизнь' (1ч.)
    });
  } else {
    res.cookie(key, value);
  }

} // module
