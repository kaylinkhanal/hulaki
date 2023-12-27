const express = require('express')
var router = express.Router();
 const {createOrder,updateOrder,deleteOrder,findOrder,findOrderById}=require('../controllers/order')
const Order= require('../models/order')
router.use(express.json());



   router.post('/orders',createOrder)
     
   router.put('/orders',updateOrder)


   router.delete('/orders',deleteOrder)

   router.get('/orders', findOrder)
<<<<<<< HEAD
    
   router.get('/orders/_id', findOrderById)
=======

   router.get('/orders/:id', findOrderById)
        
>>>>>>> 5e722c1111a989318dbbd83989e54da8c2c26773
   
   module.exports=router