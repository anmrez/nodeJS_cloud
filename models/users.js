const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    // required: true
  },
  // sessionID: {
  //   type: String,
  //   // required: true
  // }
})


module.exports = mongoose.model('User', usersSchema)
