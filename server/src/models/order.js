const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  categoryName: String, // String is shorthand for {type: String}
  productWeight: Number,
  productName: String,
  description: String,
  receiverName:String,
  receiverPhoneNumber:Number,
  senderDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiverLocDetails: {},
  senderLocDetails: {},
  status: {
    type: String,
    enum : ["Pending","Admin Approved", "Order Rejected By Admin", "Reached Pickup point", "Picked up", "Order Rejected By Diver",  "Reached Destination point",  "Order Delivered"],
    default: 'Pending'
  },
},{
  timestamps:true
});
const Order = mongoose.model('Order', orderSchema);
module.exports =Order
