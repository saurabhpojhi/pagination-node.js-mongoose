const express = require('express');
const mongoose = require('mongoose');
const Posts = require('./models/Post');
const port = 3000;
const app = express();
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connnect database 
mongoose.connect('mongodb://localhost:27017/Pagination_New')
.then(conn=>{
    console.log('MongoDB connected')
})
.catch(error=>{
    console.log("Error:"+ error.Message)
})




// Starting the server
app.listen((port),()=>{
    console.log(`Server is Running ${port}`)
});


module.exports =app;
