const posts = require('../Models/postSchema')

exports.addPosts = async (req,res)=>{
    console.log('inside add project');
    const userId = req.payload
    
    console.log(userId);

    const{username,postContent,postImage} = req.body
    const uploadPostimg = req.file?req.file.filename:postImage
    console.log(username,postContent,postImage);

    try {
        const newPost = new posts({
            userId:userId,
            userName:username,
            postContent,
            postImage:uploadPostimg
        })
    
             await newPost.save()
    
        res.status(200).json(newPost);
        
    } catch(err) {
        res.status(401).json('upload failed')
    }
     
}

exports.getPosts = async (req,res)=>{
  try {
    const homePosts = await posts.find().sort({ postTimeCre: -1 });
     res.status(200).json(homePosts)
  } catch (err) {
    res.status(401).json(err)
  }
}

exports.deletePost = async (req,res)=>{
  const {id} = req.params
  try{
   await posts.findByIdAndDelete({_id:id})
    res.status(200).json({message:'success'})
  }catch(err){
    res.status(406).json(err)
  }
}

