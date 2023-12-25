const express = require('express')
var router = express.Router();

const Order= require('../models/order')
router.use(express.json());



   router.post('/orders',async(req,res)=>{
      const data= await Order.create(req.body)
     if(data){
      
      res.json({msg: `${req.body.orderCateogry} has been created`})
     }
     }
        )
     
        router.put('/orders',async(req,res)=>{
         const id = req.body._id;
         const data= await Order.findByIdAndUpdate(id,req.body);
         if(data){
           res.json({msg: "order updated successfully"})
         }else{
           res.json({msg:'couldnot update order'});
         }
        })
        router.delete('/orders',async(req,res)=>{
         const data= await Order.findByIdAndDelete(req.body.id)
       
         if(data){
           res.json({msg: "order deleted successfully"})
         }
         else{
            res.json({msg:'couldnot delete order'});
          }
        })

        router.get('/orders',async(req,res)=>{
          const data= await Order.find().populate('senderDetails')
          if(data){
            res.json({orderList: data})
          }
         })
        
   
   module.exports=router