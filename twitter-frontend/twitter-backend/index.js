import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { TwitterApi } from 'twitter-api-v2';
import cors from "cors";
import multer from 'multer';
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Routes
app.post('/tweet', upload.single('media'), async (req, res) => {
  try {
    const { tweet } = req.body;
    let mediaId = '';
    if(req.file){
        const mediaData = await twitterClient.v1.uploadMedia(req.file.buffer, { mimeType: req.file.mimetype });
        mediaId = mediaData;
    }
    
    const response = await twitterClient.v2.tweet({
        text: tweet,
        media: {
            media_ids: [mediaId]
        }
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error posting tweet' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
