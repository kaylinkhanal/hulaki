const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const User = require('./models/user')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(express.json())
app.use(cors())
const port = 4000

connection()

app.post('/register', async(req, res) => {
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
})


app.post('/login',async (req,res)=>{
  const userDetails = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(!userDetails){
    res.json({msg :'Invalid Credentials'})
  }else{
    const isMatched = await bcrypt.compare( req.body.password,userDetails.password )
    console.log(isMatched)
    if(isMatched){
      res.json({msg :'Login Success'})
    }else{
      res.json({msg :'Incorrect password'})
    }
  }

})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})