const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password:{
        type:String,
        required:true,
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

// create a hashed Password

userSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

// compare hashed password

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatched = await bcrypt.compare(candidatePassword,this.password);
        return isMatched;
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('User',userSchema);