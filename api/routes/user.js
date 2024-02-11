import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { updateUser } from "../controllers/user_controller.js";
const userRouter=Router();

userRouter.post("/update/:id",verifyToken,updateUser)

export default userRouter;