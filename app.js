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

//  creating Posts 
app.post('/', async (req, res) => {
    const post = new Posts(req.body);
    await post.save();
    res.status(200).send('Successfully created');
});

//  getting Post
app.get('/', async (req, res) => {
    try {
        // Adding Pagination
        const limitValue = req.query.limit || 5;
        const skipValue = req.query.skip || 1;
        const posts = await Posts.find()
            .limit(limitValue).skip(skipValue);
        res.status(200).send(posts);
    } catch (e) {
        console.log(e);
    }
});

// Starting the server
app.listen((port),()=>{
    console.log(`Server is Running ${port}`)
});


module.exports =app;
