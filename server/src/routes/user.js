const express=require('express')
const router=express.Router()
const {registerNewUser, loginUser ,getAllUsers,getUserImageById}  =require('../controllers/user')
const multer  = require('multer')


const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/avatars/')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix =Math.ceil(Math.random()*40000)
     cb(null, uniqueSuffix+file.originalname )
   }
 })
 
 const upload = multer({ storage: storage })

router.post('/register', upload.single('avatar'),registerNewUser)
   
 
   router.post('/login', loginUser)
   
   router.get('/users', getAllUsers)
   router.get('/user-avatar', getUserImageById)


   module.exports=router;