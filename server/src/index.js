const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const User = require('./models/user')
const app = express()
app.use(express.json())
app.use(cors())
const port = 4000

connection()

app.post('/register', async(req, res) => {
   const userExists = await User.findOne({phoneNumber: req.body.phoneNumber})
   if(userExists){
        res.status(409).json({msg :'Phone Number already taken!'})
   }else{
    const data=  await User.create(req.body)
   if(data) res.json({msg :'User registered. Please login'})
  }
 
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})