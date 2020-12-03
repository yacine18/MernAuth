const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User