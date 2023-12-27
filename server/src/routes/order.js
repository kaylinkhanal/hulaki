const express = require('express')
var router = express.Router();
 const {createOrder,updateOrder,deleteOrder,findOrder,findOrderById}=require('../controllers/order')
const Order= require('../models/order')
router.use(express.json());



   router.post('/orders',createOrder)
     
   router.put('/orders',updateOrder)


   router.delete('/orders',deleteOrder)

   router.get('/orders', findOrder)
    
   router.get('/orders/_id', findOrderById)
   
   module.exports=router