import axios from 'axios';
import { Router } from "express";
import { TwitterApi } from 'twitter-api-v2';
import multer from 'multer';
import User from "../model/User.js";
import { authenticateToken } from "../auth.js";
import nodemailer from "nodemailer";
import Tweet from '../model/TweetModel.js';
import UserDefault from '../model/UserDefault.js';
const tweetRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishersaini11@gmail.com',
    pass: 'wauiqpsbovgzzpot',
  }
});

tweetRouter.post('/send-email',authenticateToken, (req, res) => {
  const { mediaUrl, tweet } = req.body;
    const email = req.user.email;
  if (!email) { // Basic validation
    return res.status(400).json({ message: "Missing required fields" });
  }
  const newTweet = new Tweet({
    tweet: tweet,
    mediaUrl: mediaUrl,
  });

  try {
    newTweet.save();
    const rejected = "reject";
    const allowUrl = `https://creator-ally.netlify.app/allowtweet?${mediaUrl ? `mediaurl=${mediaUrl}&` : ''}tweet=${tweet || ''}`;
    const rejectUrl = `https://creator-ally.netlify.app/allowtweet?${mediaUrl ? `mediaurl=${mediaUrl}&` : ''}tweet=${tweet || ''}&reject=${rejected}`;
    const mailOptions = {
      from: 'vishersaini11@gmail.com',
      to: email,
      subject: 'Verify your editor upload',
      html: `<p>${mediaUrl ? `Check out this awesome media: <a href="${mediaUrl}">Click Here</a></p>` : ``}
      <p>${tweet ? `Check out this tweet: ${tweet}` : 'No tweet text provided.'}</p>
      <p>Do you approve this content?</p>
      <a href="${allowUrl}" >Allow</a>  
      <a href="${rejectUrl}">Reject</a>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({message: 'email sent'});
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error saving tweet' });
  }
});

tweetRouter.post('/tweetallow',authenticateToken, async (req, res) => {
  const email = req.user.email;
  const user = await UserDefault.findOne({ email });
  const username = user.tusername;
  const user1 = await User.findOne({ username }) 
  if (!user1) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Twitter client
    const twitterClient = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: user1.token,
      accessSecret: user1.tokenSecret,
    });
    const { tweet, cloudinaryUrl } = req.body;
    const tweetOptions = {};
    if(tweet){
      tweetOptions.text = tweet;
    }
    if (cloudinaryUrl) {
      const mediaResponse = await axios.get(cloudinaryUrl, { responseType: 'arraybuffer' });
      const mediaData = mediaResponse.data;
      const mediaType = mediaResponse.headers['content-type'];

      const uploadMedia = await twitterClient.v1.uploadMedia(Buffer.from(mediaData), { mimeType: mediaType });
      tweetOptions.media = {
        media_ids: [uploadMedia]
      };
    }
    if (tweetOptions.text || tweetOptions.media) {
      const response = await twitterClient.v2.tweet(tweetOptions);
      if(tweet) await Tweet.findOneAndDelete({ tweet });
      else null;
      if(mediaUrl){
        const mediaUrl = cloudinaryUrl; 
        await Tweet.findOneAndDelete({ mediaUrl }); 
      } else null;
        res.status(200).json({ response, message: "success" });
    } else {
      // Handle case where neither text nor media is provided
      res.status(400).json({ message: 'No tweet content or media provided' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting tweet' });
  }
});

tweetRouter.post('/rejecttweet', async (req, res) => {
    const { tweet,cloudinaryUrl } = req.body;
    const mediaUrl = cloudinaryUrl;
    let user;
    try {
    if(tweet && tweet != ''){
      user = await Tweet.findOneAndDelete({ tweet });
    }
    if(mediaUrl && mediaUrl !=''){
      user = await Tweet.findOneAndDelete({ mediaUrl });
    }
      // const deleted =  await Tweet.deleteOne({ user });
      return res.status(200).json({ message: "deleted successfully"});
  
    } catch (error) {
      console.error('Error deleting tweet and media URL:', error);
      return res.status(500).json({ message: 'Error deleting tweet' });
  
    }
  })

tweetRouter.post('/tweet', upload.single('media'),authenticateToken, async (req, res) => {
  const email = req.user.email;
  const user = await UserDefault.findOne({ email });
  const username = user.tusername;  
  const user1 = await User.findOne({ username });
  if (!user1) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Twitter client
    const twitterClient = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: user1.token,
      accessSecret: user1.tokenSecret,
    });
    const { tweet } = req.body;
    const tweetOptions = {
      text: tweet,
    }
    if (req.file) {
      const mediaData = await twitterClient.v1.uploadMedia(req.file.buffer, { mimeType: req.file.mimetype });
      tweetOptions.media = {
        media_ids: [mediaData]
      }
    }
    const response = await twitterClient.v2.tweet(tweetOptions);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting tweet' });
  }
});

export default tweetRouter;