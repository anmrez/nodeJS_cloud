
module.exports = function (req, res, loggingConsole) {
  if (loggingConsole) {
    console.log(`______`);
    console.log(`${req.method} "${req.url}" :`);


  } // if
} // module
