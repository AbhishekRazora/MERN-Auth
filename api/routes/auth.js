import { Router } from "express";
import { signUp } from "../controllers/auth_controller.js";

const authRouter=Router()

authRouter.post('/sign-up',signUp)
// authRouter.post('/sign-in',signIn)
export default authRouter;