const express = require('express')
var router = express.Router();

const Reciever=require('../models/reciever');

router.use(express.json());



   router.post('/reciever',async(req,res)=>{
      const data= await Reciever.create(req.body)
     if(data){
       res.json({msg: `${req.body.orderCategory} has been created`})
     }
     }
        )
     
        router.get('/reciever',async(req,res)=>{
         const data= await Reciever.find()
         if(data){
           res.json({productList: data})
         }
        })


   module.exports=router