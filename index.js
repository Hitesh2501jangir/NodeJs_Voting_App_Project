const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const db = require('./DataBaseConnection');




app.get('/',(req,res)=>{
    res.send("Welcome To My Voting Application");
})

app.listen(PORT,()=>{
    console.log("Server is Listen on port 3000");
})