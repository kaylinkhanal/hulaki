const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  phoneNumber: String, // String is shorthand for {type: String}
  email: String,
  address: String,
  password: String
});
const User = mongoose.model('User', userSchema);
module.exports = User