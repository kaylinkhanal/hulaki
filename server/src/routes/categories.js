const express = require('express')
var router = express.Router();

const Category=require('../models/category')
router.use(express.json());

router.get('/categories',async(req,res)=>{
  const data= await Category.find()
  if(data){
    res.json({categoryList: data})
  }
 })

 router.post('/categories',async(req,res)=>{
  const data= await Category.create(req.body)
  if(data){
    res.json({msg: "categories created successfully"})
  }
 })
 router.put('/categories',async(req,res)=>{
  const id = req.body._id;
  const data= await Category.findByIdAndUpdate(id,req.body);
  if(data){
    res.json({msg: "categories updated successfully"})
  }else{
    res.json({msg:'couldnot update category'});
  }
 })
 router.delete('/categories',async(req,res)=>{
  const data= await Category.findByIdAndDelete(req.body.id)

  if(data){
    res.json({msg: "category deleted successfully"})
  }
 })



// router.post('/products',async(req,res)=>{
//  const data= await Product.create(req.body)
// if(data){
//   res.json({msg: `${req.body.productName} has been created`})
// }
// }
//    )


//    router.get('/products',async(req,res)=>{
//     const skipCount = (req.query.page - 1)*3
//     const totalCount = await Product.find().count()
//     const data= await Product.find().limit(3).skip(skipCount)
//     if(data){
//       res.json({productList: data, totalCount})
//     }
//    })


//    router.get('/products/:id',async(req,res)=>{
//     const data= await Product.findById(req.params.id)
//     if(data){
//       res.json({productList: data})
//     }
//    })


//    router.get('/search-products',async(req,res)=>{
//    const data= await Product.find({productName: { $regex: req.query.name }})
//    res.json({productList: data})
//    })




   module.exports=router