import User from "../models/user.model.js";
// import { hashSync } from "bcryptjs";
import bcryptjs from "bcryptjs"
export const signUp=async(req,res,next)=>{
    try {
        const {username,email,password}=req.body;
const hashedPassword=bcryptjs.hashSync(password,10);

        const existingUser=await User.findOne({email})

        // if(existingUser){
        //     return(
        //         res.status(401).send('user already registered')
        //     )
        // }
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        
        return res.status(201).json({
            message:"ok user created",user
        })
    } catch (error) {
        // console.log(error)
        // return res.status(500).json({
        //     message:"Error comes in signup",cause:error.message
        // })
        next(error)
    }

}