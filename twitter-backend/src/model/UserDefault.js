import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    tusername: {
        type:String,
        required:true, 
    },
    osecret:{
        type:String,
        required:true, 
    },
    esecret:{
        type:String,
        required:true,
    },
});

const UserDefault = mongoose.models.UserDefault || mongoose.model("UserDefault",userSchema);
export default UserDefault;
