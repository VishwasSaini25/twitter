import dotenv from 'dotenv';
dotenv.config();
import User from './model/User.js';
import UserDefault from './model/UserDefault.js';
import express, { json } from 'express';
import mongoose from 'mongoose';
import { TwitterApi } from 'twitter-api-v2';
import cors from "cors";
import multer from 'multer';
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = process.env.PORT || 5000;
import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import session from 'express-session';
import generateToken from "./auth.js";
import { hash, compare } from 'bcrypt';
var username;



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
  const { email, password, osecret, esecret } = req.body;
  const hashedPassword = await hash(password, 10);
  try {
    const user = await UserDefault.findOne({ email });
    if(user){
        return res.status(401).json({ error: 'User Already Existed' });
    } else {
        await UserDefault.create({ email, password: hashedPassword,osecret,esecret });
        res.status(201).json({ user });
    }
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserDefault.findOne({ email });
    if (user && (await compare(password, user.password))) {
      const token = generateToken(user);
      console.log(token);
      return res.status(200).json({ user,token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/logout', (req, res) => {
  try{
    return res.status(200).json({ message: 'Logout successful' });
  } catch(error){
    res.status(500).json({ error: 'Logout failed' });
  }
  });

app.post('/usercategory', async (req,res) => {
  const {data,email} = req.body
  try{
    const user = await UserDefault.findOne({ email });
    if(user && (data === user.osecret || data === user.esecret)){
      return res.status(200).send("valid secret");
    } else {
      return res.status(401).json({ error: 'Invalid secret' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
})
// Routes
app.post('/tweet', upload.single('media'), async (req, res) => {
  const user = await User.findOne({ username });
  console.log(user);
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
    console.log(username);
    res.redirect(`http://localhost:3000/usercategory?username=${username}`);
    console.log('Success', { userData });
  });


app.post('/', function (req, res) {
  res.send("done");
})
app.listen(port, () => console.log(`Server running on port ${port}`));
