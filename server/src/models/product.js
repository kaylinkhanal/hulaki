const mongoose=require('mongoose')
const { Schema } = mongoose;

const products = new Schema({
 productName: String, // String is shorthand for {type: String}
  Description: String,
  Brand: String,
 price :String,
 Image:String,
 Category:String,
});

const Product = mongoose.model('Product', products);
module.exports = Product