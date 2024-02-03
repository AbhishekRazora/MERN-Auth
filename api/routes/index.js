import { Router } from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";

const router=Router()

router.use('/user',userRouter)
router.use('/auth',authRouter)


export default router;