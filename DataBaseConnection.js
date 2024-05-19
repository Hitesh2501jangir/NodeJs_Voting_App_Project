const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Voting_App');

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("DataBase is connected successfully");
})

db.on('disconnected',()=>{
    console.log("DataBase is disconnect");
})

db.on('error',(err)=>{
    console.log(err);
})

module.exports = db;