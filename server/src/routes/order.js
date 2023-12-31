const express = require('express')
var router = express.Router();
 const {createOrder,updateOrder,deleteOrder,findOrder,findOrderById,getOrderCount,getOrderByOrderId}=require('../controllers/order')
const Order= require('../models/order')
router.use(express.json());



   router.post('/orders',createOrder)
     
   router.put('/orders/:id',updateOrder)


   router.delete('/orders',deleteOrder)

   router.get('/orders', findOrder)

   router.get('/order-count',getOrderCount)

   router.get('/order/:orderId',getOrderByOrderId)

   router.get('/orders/:id', findOrderById)
        
   
   module.exports=router