const mongoose = require('mongoose')

const recieverSchema = new mongoose.Schema({
  phoneNumber: String, // String is shorthand for {type: String}
  content: String,
 
});
const Reciever = mongoose.model('Reciever', recieverSchema);
module.exports =Reciever