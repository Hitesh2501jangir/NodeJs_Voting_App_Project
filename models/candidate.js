const mongoose = require('mongoose');


const candidateSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    party:{
        type:String,
        required:true,
        unique:true,
    },
    votes:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,
            },
            votedAt:{
                type:Date,
                default:Date.now(),
            },
        },
    ],
    voteCount:{
        type:Number,
        default:0,
    },
})


module.exports = mongoose.model('Candidate',candidateSchema);