const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId:{type:String,require:true},
    userName:{type:String,require:true},
    postContent:{type:String},
    postImage:{type:String},
    postTimeCre:{type:Date,default:Date.now}
})

const posts = mongoose.model('posts',postSchema)

module.exports = posts