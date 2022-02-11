const serverValidation = require('../lib/validRegistration.js')

module.exports = async function (req, res) {
  serverValidation(req, res)
}
