import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constant.js";

export const createToken=(id,email,expiresIn)=>{
    const payload= {id,email}

    const token=jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn,
    })
    return token;

}