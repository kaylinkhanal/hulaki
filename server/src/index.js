const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const app = express()
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')

app.use(express.json())
app.use(cors())
app.use(userRoute)
app.use(productRoute)

const port = 4000
connection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})