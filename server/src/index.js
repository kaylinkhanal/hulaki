const express = require('express')
const cors = require('cors')
const connection = require('./db/connection')
const app = express()
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const Order = require('./models/order')
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
});
require('dotenv').config()
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/categories')
const orderRoute=require('./routes/order')

io.on('connection', (socket) => {
  console.log('conneted')

  socket.on('orderDetails',async (orderDetails) => {
     await Order.create(orderDetails)
    const totalOrders = await Order.find().count() 
    if(totalOrders){
      io.emit('orderDetails', totalOrders)
    }
  });

  socket.on('msg', (msg) => {
    console.log(msg);
  });
  ///
});

app.use(express.json())

app.use(cors())
app.use(userRoute)
app.use(categoryRoute)
app.use(orderRoute)

const port = process.env.PORT || 4000
connection()

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

