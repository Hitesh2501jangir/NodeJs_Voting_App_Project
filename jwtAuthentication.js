const jwt = require('jsonwebtoken');


// create a verify middleWare

const jwtAuthMiddleWare = function(req,res,next){
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(404).json({error:"Token Not Found"});

    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(404).json({error:"Unauthorize"});

    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY);

        req.user = decode;

        next();
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Invalid User"});
    }
}


// create jwt

const generateToken = (userData)=>{
    return jwt.sign(userData,process.env.SECRET_KEY,{expiresIn:300});
}

module.exports = {jwtAuthMiddleWare,generateToken};