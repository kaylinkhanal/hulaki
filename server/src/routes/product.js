const express=require('express')
const router=express.Router()
const Product = require('../models/product')
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.post('/products', async(req, res) => {
  await Product.create(req.body)
   })
   
 


   module.exports=router;