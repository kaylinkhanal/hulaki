const express = require('express')
var router = express.Router();

const{createCategory,getCategory,updateCategory,deleteCategory,editCategory}=require('../controllers/categories')
const Category=require('../models/category')
router.use(express.json());

router.post('/categories',createCategory)

router.get('/categories',getCategory)

 
 router.put('/categories',updateCategory)

 router.delete('/categories',deleteCategory)

 router.put('/categories',editCategory)


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