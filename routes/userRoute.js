const express = require('express');
const router = express.Router();
const user = require('./../models/user');
const {jwtAuthMiddleWare,generateToken} = require('./../jwtAuthentication');


//signup route
router.post('/signup',async (req,res)=>{
    try{
        const data = req.body;
        const newUser = new user(data);
        const response = await newUser.save();
        const payLoad = {
            id:response.id,
            email:response.email,
        }
        const token = generateToken(payLoad);
        console.log("User SingnUp Successful");
        res.status(200).json({res:response,tok:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

//login route
router.post('/login',async (req,res)=>{
    try{
        const {addhar_No,password} = req.body;
        const person = await user.findOne({addhar_No});
        if(!person || !(await person.comparePassword(password))){
            return res.json({error:"Invalid User or Password"});
        }
        const payLoad = {
            id:person.id,
            email:person.email,
        }
        const token = generateToken(payLoad);
        res.status(200).json(token);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})

// profile access route
router.get('/profile', jwtAuthMiddleWare ,async (req,res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const reponse = await user.findById(userId);
        res.status(200).json(reponse);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

//update password
router.put('/profile/password',jwtAuthMiddleWare,async(req,res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const {currentPassword,newPassword} = req.body;
        const person = await user.findById(userId);
        if(!(await person.comparePassword(currentPassword))){
            return res.status(404).json({error:"user is not valid"});
        }
        person.password = newPassword;
        await person.save();
        console.log("password updated");
        res.status(200).json({message:"password updated"})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

module.exports = router;

