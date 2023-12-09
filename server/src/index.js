const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const app = express()

require('dotenv').config()
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const orderRoute=require('./routes/order')

app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(productRoute)
app.use(orderRoute)

const port = process.env.PORT || 4000
connection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})