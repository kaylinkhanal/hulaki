const express = require('express')
var router = express.Router();

const Order=require('../models/order')
router.use(express.json());



   router.post('/order',async(req,res)=>{

      const data= await Order.find({category: req.body})
     if(data){
       res.json({msg: `${req.body.orderCategory} has been created`})
     }
     }
        )
     
        router.get('/order',async(req,res)=>{
         const data= await Order.find()
         if(data){
           res.json({productList: data})
         }
        })


   module.exports=router