import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import User from './model/User.js';
import UserDefault from './model/UserDefault.js';
import express, { json } from 'express';
import mongoose from 'mongoose';
import { TwitterApi } from 'twitter-api-v2';
import cors from "cors";
import multer from 'multer';
import nodemailer from "nodemailer";
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = process.env.PORT || 5000;
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import session from 'express-session';
import generateToken from "./auth.js";
import { hash, compare } from 'bcrypt';
import { tweetData,imagesData } from './imagesData.js';
var username;
var useremail;



// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId, function (err, user) {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.API_KEY,
  consumerSecret: process.env.API_SECRET,
  callbackURL: "http://localhost:5000/auth/twitter/callback"
},
  async (token, tokenSecret, profile, cb) => {
    try {
      let user = await User.findOne({ twitterId: profile.id });
      if (!user) {
        user = await User.create({
          twitterId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          token: token,
          tokenSecret: tokenSecret,
        });
      } else {
        user.token = token;
        user.tokenSecret = tokenSecret;
        await user.save();
      }
      return cb(null, user);
    } catch (error) {
      return cb(error.respone.data, null);
    }
  }
));

app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: 'auto', maxAge: 60000 } })
);
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // User Routes

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, password, osecret, esecret,tusername } = req.body;
  useremail = email;
  const hashedPassword = await hash(password, 10);
  try {
    const user = await UserDefault.findOne({ email });
    if(user){
        return res.status(401).json({ error: 'User Already Existed' });
    } else {
        await UserDefault.create({ email, password: hashedPassword,osecret,esecret,tusername });
        res.status(201).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
// login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  useremail = email;
  console.log(useremail);
  try {
    const user = await UserDefault.findOne({ email });
    if (user && (await compare(password, user.password))) {
      const token = generateToken(user);
      return res.status(200).json({ user,token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
// logout
app.post('/logout', (req, res) => {
  try{
    return res.status(200).json({ message: 'Logout successful' });
  } catch(error){
    res.status(500).json({ error: 'Logout failed' });
  }
  });
// user category
app.post('/usercategory', async (req,res) => {
  const {data} = req.body
  const email = useremail;
  console.log(useremail);
  try{
    const user = await UserDefault.findOne({ email });
    console.log(user);
    if(user && (data === user.osecret || data === user.esecret)){
      return res.status(200).send({email,message: "valid secret"});
    } else {
      return res.status(401).json({ error: 'Invalid secret' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
})

// email sender
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishersaini11@gmail.com',
    pass: 'wauiqpsbovgzzpot',
  }
});


app.post('/send-email', (req, res) => {
  const { mediaUrl,tweet } = req.body;
  imagesData.push(mediaUrl);
  tweetData.push(tweet)
  const allowUrl = `http://localhost:3000/allowtweet?mediaurl=${mediaUrl}&tweet=${tweet}`;
  console.log(useremail);
  const mailOptions = {
      from: 'vishersaini11@gmail.com',
      to: useremail,
      subject: 'Verify your editor upload',
      html: `<p>Check out this awesome media: <a href="${mediaUrl}">Click Here</a></p>
      <p>Check out this tweet: ${tweet}</p>
      <p>Do you approve this content?</p>
      <a href="${allowUrl}" >Allow</a>  
      <a>Reject</a>
      `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Email sent: ' + info.response);
      return res.status(200).json({imagesData,tweetData});
    });
});


// Routes
app.post('/tweet', upload.single('media'), async (req, res) => {
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Twitter client
    const twitterClient = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: user.token,
      accessSecret: user.tokenSecret,
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


app.post('/tweetallow', async (req,res) => {
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  try {
    // Twitter client
    const twitterClient = new TwitterApi({
      appKey: process.env.API_KEY,
      appSecret: process.env.API_SECRET,
      accessToken: user.token,
      accessSecret: user.tokenSecret,
    });
    const { tweet,cloudinaryUrl } = req.body;
    const tweetOptions = {
      text: tweet,
    } 
    if(cloudinaryUrl){
      const mediaResponse = await axios.get(cloudinaryUrl,{responseType: 'arraybuffer'});
      const mediaData = mediaResponse.data;
      const mediaType = mediaResponse.headers['content-type'];

      const uploadMedia = await twitterClient.v1.uploadMedia(Buffer.from(mediaData),{mimeType: mediaType});
      tweetOptions.media={
        media_ids: [uploadMedia]
      };
    }
    const response = await twitterClient.v2.tweet(tweetOptions);
    res.status(200).json({response,message: "success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting tweet' });
  }
});

app.get(
  '/auth/twitter',
  passport.authenticate('twitter', {
    scope: ['tweet.read', 'users.read', 'offline.access'],
  })
);

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    username = req.user.username;    
    res.redirect(`http://localhost:3000/usercategory`);
    console.log('Success');
  });


app.post('/', function (req, res) {
  res.send("done");
})
app.listen(port, () => console.log(`Server running on port ${port}`));
