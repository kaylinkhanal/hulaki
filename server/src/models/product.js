const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productPrice: String, // String is shorthand for {type: String}
  productName: String,
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product