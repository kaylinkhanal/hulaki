const express = require('express')
var router = express.Router();

const Product=require('../models/product')
router.use(express.json());


router.post('/products',async(req,res)=>{
 const data= await Product.create(req.body)
if(data){
  res.json({msg: `${req.body.productName} has been created`})
}
}
   )

   router.get('/products',async(req,res)=>{
    const data= await Product.find()
    if(data){
      res.json({productList: data})
    }
   })


   module.exports=router