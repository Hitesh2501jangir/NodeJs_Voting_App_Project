const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const db = require('./DataBaseConnection');
const { config } = require('dotenv');
require('dotenv').config();
app.use(express.json());
const {jwtAuthMiddleWare} = require('./jwtAuthentication');

// import routes
const userRoute = require('./routes/userRoute');
const candidateRoute = require('./routes/candidateRoute');




//routes use
app.use('/user',userRoute);
app.use('/candidate',jwtAuthMiddleWare,candidateRoute);


app.get('/',(req,res)=>{
    res.send("Welcome To My Voting Application");
})

app.listen(PORT,()=>{
    console.log("Server is Listen on port 3000");
})