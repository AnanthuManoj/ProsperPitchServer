const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type:String,required:true,unique:true},
    password: { type: String, required: true },
    Phone:{type:String},
    title:{type:String},
    about:{type:String},
    profile_pic :{type:String}
})

const users = mongoose.model('users',userSchema)

module.exports = users