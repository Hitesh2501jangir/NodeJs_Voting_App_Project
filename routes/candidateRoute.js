const express = require('express');
const router = express.Router();
const candidate = require('./../models/candidate');
const {jwtAuthMiddleWare,generateToken} = require('./../jwtAuthentication');
const user = require('./../models/user');


//check the role of user
const checkAdminRole = async (userId)=>{
    try{
        const person = await user.findById(userId);
        return person.role === 'admin';
    }catch(err){
        return false;
    }
}

//create route for candidate
router.post('/create', async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(404).json({message:"User is Not a Admin"});
        }
        const data = req.body;
        const newCandidate = new candidate(data);
        const response = await newCandidate.save();
        console.log("Candidate Data stored successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

//update route for candidate
router.put('/update/:candidateId', async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(404).json({message:"User is Not a Admin"});
        }

        const candidateId = req.params.candidateId;
        const updatedCandidateData = req.body;
        const response = await candidate.findByIdAndUpdate(candidateId, updatedCandidateData,{
            new:true,
            runValidators:true,
        });

        if(!response){
            return res.status(404).json({message:"User is Not find"});
        }

        console.log("Data Updated successfully");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

//delete route for candidate
router.delete('/delete/:candidateId', async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id)){
            return res.status(404).json({message:"User is Not a Admin"});
        }

        const candidateId = req.params.candidateId;
        const response = await candidate.findByIdAndDelete(candidateId);

        if(!response){
            return res.status(404).json({message:"User is Not find"});
        }

        console.log("Data Deleted Successfully");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

// fetch candidate
router.get('/',(req,res)=>{
    try{
        const response = candidate.find();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

module.exports = router;