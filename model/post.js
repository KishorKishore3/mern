const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
          },
          desc: {
            type: String,
            required: true,
          },
          photo: {
            type: String,
          
          },
          username: {
            type: String,
            required: true,
            unique:true
          },
        //  user: { type: ObjectId, ref: 'User' },
   
       
    },
    {timestamps:true}
)


module.exports  = mongoose.model("Post",postSchema);
