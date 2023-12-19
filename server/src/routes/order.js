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
     
        router.put('/admin',async(req,res)=>{
         const id = req.body._id;
         const data= await orders.findByIdAndUpdate(id,req.body);
         if(data){
           res.json({msg: "order updated successfully"})
         }else{
           res.json({msg:'couldnot update order'});
         }
        })
        router.delete('/admin',async(req,res)=>{
         console.log(req.body)
         const data= await orders.findByIdAndDelete(req.body.id)
       
         if(data){
           res.json({msg: "order deleted successfully"})
         }
         else{
            res.json({msg:'couldnot delete order'});
          }
        })

  
        
   
   module.exports=router