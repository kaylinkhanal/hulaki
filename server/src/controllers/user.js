const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerNewUser= async(req, res) => {
    try{
     //check if user/email/phoneNumber doesnt already exist
     const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
     if(userExists){
          res.status(409).json({msg :'Phone Number already taken!'})
     }else{
       // generate a hash Password
       const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
       req.body.password = hashPassword
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
         const token = jwt.sign({phoneNumber: req.body.phoneNumber, id: userDetails._id}, process.env.SECRET_KEY);
        res.json({msg :'Login Success', token,userDetails:userInfo})
      }else{
        res.status(401).json({msg :'Incorrect password'})
      }
    }
  
  }
   module.exports = {registerNewUser,loginUser}