const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  senderId: String, // String is shorthand for {type: String}
  receiverInfo: {},
  productInfo: {},
  price:{},
  location: {},
  status: {
    type: String,
    enum : ["Order Requested","Admin Approved", "Order Rejected By Admin", "Reached Pickup point", "Picked up", "Order Rejected By Diver",  "Reached Destination point",  "Order Delivered"],
    default: 'Admin'
  }
  
});
const User = mongoose.model('User', orderSchema);
module.exports = User