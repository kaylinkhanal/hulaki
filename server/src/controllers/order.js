const Order= require('../models/order')

const createOrder=async(req,res)=>{
    const data= await Order.create(req.body)
   if(data){
    
    res.json({msg: `${req.body.orderCateogry} has been created`})
   }
   }
      

const updateOrder=async(req,res)=>{
  console.log(req.body)
    const id = req.params.id;
    const data= await Order.findByIdAndUpdate(id,req.body);
    if(data){
      res.json({msg: "order updated successfully"})
    }else{
      res.json({msg:'couldnot update order'});
    }
   }


   const deleteOrder=async(req,res)=>{
    const data= await Order.findByIdAndDelete(req.body.id)
  
    if(data){
      res.json({msg: "order deleted successfully"})
    }
    else{
       res.json({msg:'couldnot delete order'});
     }
   }


 const findOrder=async(req,res)=>{
    const data= await Order.find().populate('senderDetails')
    if(data){
      res.json({orderList: data})
    }
   }


   const getOrderCount=async(req,res)=>{
    const count= await Order.find().count()
    if(count){
      res.json({count})
    }
   }


   const getOrderByOrderId=async(req,res)=>{
    const orderDetails= await Order.findById(req.params.orderId)
    if(orderDetails){
      res.json({orderDetails})
    }
   }

   
  const findOrderById =async(req,res)=>{
    console.log(req.params.id)
    const data= await Order.find({senderDetails: req.params.id})
    if(data){
      res.json({orderList: data})
    }
   }


module.exports={createOrder,updateOrder,deleteOrder,findOrder,findOrderById,getOrderCount,getOrderByOrderId}