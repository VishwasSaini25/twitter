import { Router } from "express";
import authRouter from "./authRouter.js";
import userCategory from "./userCategory.js";
import tweetRouter from "./tweetRouter.js";
import historyRouter from "./historyRouter.js";
const router = Router();

router.use('/auth',authRouter);
router.use(userCategory);
router.use(tweetRouter);
router.use(historyRouter);

export default router;