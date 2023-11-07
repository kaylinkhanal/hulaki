const mongoose = require('mongoose')
const connection = async ()=>{
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/hulakidb');
        if(conn){
            console.log("connected to mongodb")
        }
    }catch(err){
        console.log(err)
    }
}
//test

module.exports = connection