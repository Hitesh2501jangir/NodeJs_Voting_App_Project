const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    mobile_No:{
        type:String,
    },
    address:{
        type:String,
        require:true,
    },
    addhar_No:{
        type:Number,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false,
    },
})

module.exports = mongoose.model('User',userSchema);