import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    twitterId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        require:true,
    },
    token:{
        type:String,
    },
    tokenSecret:{
        type:String,
    },
});

const User = mongoose.models.User || mongoose.model("User",userSchema);
export default User;
