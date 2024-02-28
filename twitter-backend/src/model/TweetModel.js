import mongoose from "mongoose";

const tweetSchema=new mongoose.Schema({
    tweet:{
        type:String,
        default:''
    },
    mediaUrl:{
        type:String,
        default:''
    }
});

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet",tweetSchema);
export default Tweet;
