import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import router from "./routes/router.js";
import passport from "passport";
import { Strategy as TwitterStrategy } from 'passport-twitter';
import User from "./model/User.js";
import session from 'express-session';

const app = express();
app.use(cors());
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
    callbackURL: "https://creator-ally.onrender.com/auth/twitter/callback"
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
app.use(router);

export default app;