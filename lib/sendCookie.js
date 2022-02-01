module.exports = function (req, res, key, value, life){
  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60 * life, // устнавливаеться 'жизнь' (1ч.)
  });
}


// // создание куки с значением в инпуте userName
// res.cookie('token', `${req.body.userName}`, {
//     maxAge: 1000 * 60 * 60 * 24, // устнавливаеться 'жизнь' (24ч.)
//     // signed: true
//   });
