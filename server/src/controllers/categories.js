
const Category=require('../models/category');


   const getCategories=async(req,res)=>{
    const data= await Category.find()
    if(data){
      res.json({categoryList: data})
    }
   }
   const findCategories=async(req,res)=>{
    const data = await Category.findByIdAndUpdate(req.params.id,req.body);
    console.log(data);
    if(data){
      res.json({msg:'successfully updated profile details',categoryList:data})
    }else{
      res.json({msg:'couldnot update profile details'});
    }
   }
 
   const submitCategories=async(req,res)=>{
    const data= await Category.create(req.body)
    if(data){
      res.json({msg: "categories created successfully"})
    }
   }
   const updateCategories=async(req,res)=>{
    const id = req.body._id;
    const data= await Category.findByIdAndUpdate(id,req.body);
    if(data){
      res.json({msg: "categories updated successfully"})
    }else{
      res.json({msg:'couldnot update category'});
    }
   }

   const deleteCategories=async(req,res)=>{
    console.log(req.body)
    const data= await Category.findByIdAndDelete(req.body.id)
  
    if(data){
      res.json({msg: "category deleted successfully"})
    }
   }
   
   module.exports = {getCategories,findCategories,submitCategories,updateCategories,deleteCategories}