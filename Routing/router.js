//import express
const express = require('express')

//import controller
const userController = require('../Controller/userController')

const postsController = require('../Controller/postController')

const likeController = require('../Controller/likeController')

const multerConfig = require('../Middleware/multer')
const jwtMiddleware = require('../Middleware/jwt')

//create object for router
const router = new express.Router()

//register
router.post('/user/register',userController.userRegister)

//login
router.post('/user/login',userController.userLogin)

//addPosts
router.post('/post/add',jwtMiddleware,multerConfig.single("postImage"),postsController.addPosts)

//getposts
router.get('/home/posts',postsController.getPosts)

//getuserdetails
router.post('/user/details',userController.getUsersDetails)

//update user details
router.put('/profile/update',jwtMiddleware,multerConfig.single('profile_pic'),userController.UpdateProfile)

//delete posts
router.delete('/post/delete/:id',postsController.deletePost)

//like Posts
router.post('/post/like',likeController.addLikes)

//get post
router.get('/post/allLikes',likeController.getLikes)

//remove likes 
router.delete('/post/removeLike',likeController.removeLikes)

//search users
router.get('/search/users',userController.searchUsers)

module.exports = router