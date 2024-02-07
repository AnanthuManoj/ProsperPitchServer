const likes = require('../Models/likeSchema')


exports.addLikes = async  (req, res) => {
    const {userId,userName,postContent,postImage,postTimeCre,PostId,LikedUser} = req.body
    console.log( userId,userName,postContent,postImage,postTimeCre,PostId,LikedUser);
    try {
          const existingLikes = await likes.findOne({PostId,LikedUser})
           if(existingLikes){
             res.status(401).json('Your have already liked this post')
           }else{
            const newLikes = new likes({
                userId,userName,postContent,postImage,postTimeCre,PostId,LikedUser
              })
              const saveLikes = await newLikes.save()
              res.status(200).json(saveLikes)
         
           }
            
    } catch (error) {
        console.log(error);
        res.status(406).json(error)
    }
}

exports.getLikes = async (req, res) => {
    try {
        const userLikes = await likes.find()
        res.status(200).json(userLikes)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}

exports.removeLikes = async (req, res) => {
    const {LikedUser , postId } = req.body
    console.log(LikedUser,postId);
    try {
        const removeLike = await likes.deleteOne({ PostId:postId, LikedUser });
        if (removeLike.deletedCount === 1) {
            console.log('Successfully deleted the like.');
            res.status(200).json('success');
        } else {
            console.log('No matching document found to delete.');
            res.status(404).json('No matching document found to delete.');
        }
    } catch (error) {
        console.error('Error deleting the like:', error);
        res.status(500).json('Internal server error');
    }
}