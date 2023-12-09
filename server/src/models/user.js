const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName:String,   // String is shorthand for {type: String}
  phoneNumber: String,
  email: String,
  address: String,
  role: {
    type:String,
    enum:['user','rider', 'admin'],
    default:'user'
  },
  password: String,
  avatar: String
});
const User = mongoose.model('User', userSchema);
module.exports = User