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
  role: {
    type: String,
    required: true,
    default: 'USER'
  }
})


module.exports = mongoose.model('User', usersSchema)
