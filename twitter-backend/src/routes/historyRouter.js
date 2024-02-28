import { Router } from "express";
import Tweet from "../model/TweetModel.js";
import { authenticateToken } from "../auth.js";
import UserDefault from "../model/UserDefault.js";
const historyRouter = Router();

historyRouter.get('/fetchtweet', async (req, res) => {
  try {
    const tweets = await Tweet.find({}); // Fetch all tweets
    res.status(200).json({ tweets });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching tweets' });
  }
});

historyRouter.post('/settings',authenticateToken, async (req,res) => {
  const username = req.body.username;
  const email = req.user.email;
  try{
    const user = await UserDefault.findOne({ email });
    if(user){
      user.tusername = username;
      await user.save();
      return res.status(200).send({ message: "username changed" });
    } else {
      return res.status(401).json({ error: 'user not found' });
    }
  }catch(error){
    res.status(500).json({ error: 'Failed' });
  }
})

export default historyRouter;