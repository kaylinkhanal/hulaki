const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const app = express()

require('dotenv').config()
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute=require('./routes/order')
const recieverRoute=require('./routes/reciever')
app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(productRoute)
app.use(orderRoute)
app.use(recieverRoute)
const port = process.env.PORT 
connection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})