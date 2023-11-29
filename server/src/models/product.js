const mongoose=require('mongoose')
const { Schema } = mongoose;

const products = new Schema({
    productCategory: String,
    weight: String,
    locationFrom: String,
    senderName: String,
    senderPhoneNumber: String,
    receiverName: String,
    receiverPhoneNumber: String,
    locationTo: String,
    estimatedPrice: String,
});

const Product = mongoose.model('Product', products);
module.exports = Product