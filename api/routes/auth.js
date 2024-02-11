import { Router } from "express";
import { signIn, signOut, signUp, signWithGoogle } from "../controllers/auth_controller.js";
import { signInValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const authRouter=Router()

authRouter.post('/sign-up',validate(signUpValidator),signUp)
authRouter.post('/sign-in',validate(signInValidator),signIn)
authRouter.post('/google',signWithGoogle)
authRouter.get('/sign-out',verifyToken,signOut)
export default authRouter;