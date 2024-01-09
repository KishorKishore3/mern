const express = require("express");
const router = express.Router();
const Post = require("../model/post");

const User = require("../model/user");
const mongoose = require("mongoose")




router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    const{username} = req.body;
    
    const existingPost = await Post.findOne( {username} );
    if (existingPost) {
                    return res.status(400).json({
                        message: "You've already posted a blog.",
                    });
                }

    try{
           
            try {
                const savedPost = await newPost.save();
                res.status(200).json(savedPost);
              } catch (err) {
                res.status(500).json(err);
              }
           

    }catch(err){
      console.log(err)
    }
    
  });




// UPDATE

router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{

                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set :req.body,
                },{new:true})
                res.status(200).json(updatePost);
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can update only your post")
        }

    }catch(err){
        res.status(500).json(err);
    }
})

// DELETE

router.delete("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{

                 await post.deleteOne()
                res.status(200).json("post has been deleted...");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can delete only your post")
        }

    }catch(err){
        res.status(500).json(err);
    }
})

//GET

router.get("/:id",async(req,res)=>{
    try{
         const post = await Post.findById(req.params.id);
         res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ALL POST

router.get("/",async(req,res)=>{
    const username = req.query.user;
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts); 
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;