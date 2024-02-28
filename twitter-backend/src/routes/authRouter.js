import { Router } from "express";
import passport from 'passport';
import UserDefault from "../model/UserDefault.js";
import { hash, compare } from 'bcrypt';
import { generateToken }  from "../auth.js";
const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    const { email, password, osecret, esecret, tusername } = req.body;
    const hashedPassword = await hash(password, 10);
    try {
      const user = await UserDefault.findOne({ email });
      if (user) {
        return res.status(401).json({ error: 'User Already Existed' });
      } else {
        const user1 = await UserDefault.create({ email, password: hashedPassword, osecret, esecret, tusername })
        res.status(201).json({ user1 });
      }
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  });

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserDefault.findOne({ email });
    if (user && (await compare(password, user.password))) {
      const token = generateToken(user);
      return res.status(200).json({ user, token });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

authRouter.post('/logout', (req, res) => {
  try {
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

authRouter.get(
    '/twitter',
    passport.authenticate('twitter', {
      scope: ['tweet.read', 'users.read', 'offline.access'],
    })
  );

authRouter.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    const userData = JSON.stringify(req.user, undefined, 2);
    res.redirect(`http://localhost:3000/usercategory`);
  });

export default authRouter;