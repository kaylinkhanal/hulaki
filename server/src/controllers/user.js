const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const path = require('path')
const registerNewUser= async(req, res) => {
    try{
      console.log(req.file)
     //check if user/email/phoneNumber doesnt already exist
     const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
     if(userExists){
          res.status(409).json({msg :'Phone Number already taken!'})
     }else{
       // generate a hash Password
       const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
       req.body.password = hashPassword
       req.body.avatar = req.file.filename
       // create new user with hash password
      const data=  await User.create(req.body)
     if(data) res.json({msg :'User registered. Please login'})
    }
    }catch(err){
     console.log(err)
    }
   }

const loginUser = async (req,res)=>{
    //1. check if phoneNumber exists
    const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber}).lean()

    if(!userDetails){
      res.status(401).json({msg :'Invalid Credentials'})
    }else{
     // compare the password
      const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
      if(isMatched){
       const {password , ...userInfo} = userDetails
       // generate a token for the user
         const token = jwt.sign({phoneNumber: req.body.phoneNumber, id: userDetails._id}, 'fggff65rf7if');
        res.json({msg :'Login Success', token,userDetails:userInfo})
      }else{
        res.status(401).json({msg :'Incorrect password'})
      }
    }
  
  }


  const getAllUsers = async (req,res)=>{
    const list = await  User.find()
    res.json({list})
  }



  const getUserImageById = async (req,res)=>{
    const userDetails = await User.findById(req.query.userId)
    if(userDetails?.avatar){
      const imgPath = path.join(__dirname , '/../../uploads/avatars/', userDetails.avatar)
      res.sendFile(imgPath)
    }else{
      const imgPath = path.join(__dirname , '/../../uploads/avatars/', 'default.png')
      res.sendFile(imgPath)
    }
   
  }





  const updateUserDetails = async(req,res)=>{
    const data = await User.findByIdAndUpdate(req.params.id,req.body);
    console.log(data);
    if(data){
      res.json({msg:'successfully updated profile details',userDetails:data})
    }else{
      res.json({msg:'couldnot update profile details'});
    }
   }



  const changePassword = async (req,res)=>{
    //1. check if phoneNumber exists
   
    const userDetail = await User.findById(req.query.userId).select('+password')
    
    const isMatched = await bcrypt.compare(req.body.oldPassword, userDetail.password)
    if(isMatched){
      const hashPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
      await User.findByIdAndUpdate(req.query.userId, {password: hashPassword})
       
        res.json({msg :'Password Changed'})
      }else{
        res.status(401).json({msg :'Incorrect password'})
      }
    }
  
  


   module.exports = {registerNewUser,loginUser,getAllUsers,getUserImageById,changePassword,updateUserDetails}


   