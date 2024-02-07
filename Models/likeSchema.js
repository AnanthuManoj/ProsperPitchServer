const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId:{type:String,require:true},
    userName:{type:String,require:true},
    postContent:{type:String},
    postImage:{type:String},
    postTimeCre:{type:Date},
    PostId:{type:String},
    LikedUser:{type:String},
})

const likes = mongoose.model('likes',likeSchema)

module.exports = likes; 