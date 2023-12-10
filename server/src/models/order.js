const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderCateogry: String, // String is shorthand for {type: String}
  productWeight: Number,
  description: String,
  receiverName:String,
  receiverPhoneNumber:Number,
  senderDetails: {},
  status: {
    type: String,
    enum : ["Pending","Admin Approved", "Order Rejected By Admin", "Reached Pickup point", "Picked up", "Order Rejected By Diver",  "Reached Destination point",  "Order Delivered"],
    default: 'Pending'
  },
});
const Order = mongoose.model('Order', orderSchema);
module.exports =Order
