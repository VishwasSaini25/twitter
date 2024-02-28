import { Router } from "express";
import UserDefault from "../model/UserDefault.js";
import { authenticateToken } from "../auth.js";
const userCategory = Router();

userCategory.post('/usercategory',authenticateToken, async (req, res) => {
  const { data } = req.body
  const email = req.user.email;
  try {
    const user = await UserDefault.findOne({ email });
    if (user && (data === user.osecret || data === user.esecret)) {
      return res.status(200).send({ email, message: "valid secret" });
    } else {
      return res.status(401).json({ error: 'Invalid secret' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
})

export default userCategory;