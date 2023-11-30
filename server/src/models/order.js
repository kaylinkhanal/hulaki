const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderCategory: String, // String is shorthand for {type: String}
  productWeight: Number,
  content: String,
  packagingType: String,
  hazardousMaterial: String,
  senderReferenceNumber: String
});
const Order = mongoose.model('Order', orderSchema);
module.exports =Order