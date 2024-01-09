const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        username :{
            type:String,
            required:true,
            unique :true
            
             
        },
        email :{
            type:String,
            required:true,
            
        },
        password:{
            type:String,
            required:true
            
        },
        profilePic :{
            type:String
        },
        //  posts: [{ type:ObjectId, ref: "Post", required: true }],
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchema);
