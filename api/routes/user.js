import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { deleteUser, updateUser } from "../controllers/user_controller.js";
const userRouter=Router();

userRouter.post("/update/:id",verifyToken,updateUser)
userRouter.delete("/delete/:id",verifyToken,deleteUser)

export default userRouter;