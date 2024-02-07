 const users = require('../Models/userSchema')
 const jwt = require('jsonwebtoken')


 exports.userRegister= async(req,res)=>{
 
   const {username,email,password} = req.body
   try {
      const existUser = await users.findOne({email})
      if(existUser){
        res.status(406).json('User Already Exist Please Login')
      }else{
         const newUser = new users ({
            username, 
            email , 
            password,
            Phone:"",
            title:"",
            about:"",
            profile_pic:""
         });
         await newUser.save()
         res.status(200).json(newUser)
      }
   } catch (error) {
      res.status(401).json('registration failed',error)
   }
 }

 exports.userLogin = async(req,res)=>{
   const{email,password}=req.body
   try {
      const Login = await users.findOne({email,password})
      if(Login){
         const token = jwt.sign({userId:Login._id},process.env.SecretKey)
         res.status(200).json({ token,Login})
      }else{
         res.status(406).json("Invalid Email or Password")
      }
   } catch (error) {
      res.status(401).json('login failed',error)

   }
 }

 exports.getUsersDetails = async(req,res)=>{
   try {
      
      const user = await users.find()
      res.status(200).json(user)
   } catch (err) {
      res.status(401).json(err)
   }
 }

 exports.UpdateProfile = async(req,res)=>{
   const id = req.payload
   const{username,email,password,Phone,title,about,profile_pic} = req.body
   console.log(username,email,password,Phone,title,about,profile_pic)
   const profileImage = req.file?req.file.filename:profile_pic
   try {
      const updateProfile = await users.findByIdAndUpdate({_id:id},{username,email,password,Phone,title,about,profile_pic:profileImage},{new:true})
      await updateProfile.save()
      res.status(200).json(updateProfile)
   } catch (error) {
      res.status(401).json(error)
   }
 }

 exports.searchUsers = async(req, res) => {
    const searchKey = req.query.search;
    const query={
      username: {
         $regex: new RegExp(searchKey, 'i'),
       },
   }
   try {
      const user = await users.find(query)
      res.status(200).json(user)
   } catch (err) {
      res.status(401).json('request failed due to ',err)
   }
 }