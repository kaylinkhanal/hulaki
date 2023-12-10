const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderCateogry: String, // String is shorthand for {type: String}
  productWeight: Number,
  description: String,
  fullName:String,
  phoneNumber:Number,
  status: {
    type: String,
    enum : ["Order Requested","Admin Approved", "Order Rejected By Admin", "Reached Pickup point", "Picked up", "Order Rejected By Diver",  "Reached Destination point",  "Order Delivered"],
    default: 'Admin Approved'
  },
  

});
const Order = mongoose.model('Order', orderSchema);
module.exports =Order
