import { Router } from "express";
import { signIn, signUp } from "../controllers/auth_controller.js";
import { signInValidator, signUpValidator, validate } from "../utils/validators.js";

const authRouter=Router()

authRouter.post('/sign-up',validate(signUpValidator),signUp)
authRouter.post('/sign-in',validate(signInValidator),signIn)
export default authRouter;