import User from "../models/user.model.js";

import bcryptjs from "bcryptjs"
import { COOKIE_NAME } from "../utils/constant.js";
import { createToken } from "../utils/token-manager.js";




/*****======Sign-up =====**** */

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const existingUser = await User.findOne({ email })

       
        if (existingUser) {
            return (
                res.status(401).json({
                    success:false,
                    message: 'user already registered'
                })

            )
        }
        const user = new User({ username, email, password: hashedPassword })
        await user.save()


        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date()
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        })

        return res.status(201).json({
           success:true, message: "ok user created", username: user.username, email: user.email, id: user._id, photo: user.photo
        })
    } catch (error) {
        console.log(error)
       
        next(error)
    }

}

/*****======Sign-In =====**** */

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success:false, message: "User not registered" })
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(403).json({success:false, message: "Incorrect credentials" })

        }




        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date()
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        })

        return res.status(201).json({
           success:true, message: "ok sign-in successfully", username: user.username, email: user.email, id: user._id, photo: user.photo
        })
    } catch (error) {
        console.log(error)
       
        next(error)
    }

}



/*****======Sign-in with google =====**** */

export const signWithGoogle = async (req, res, next) => {
    try {
        const { username, email, photo } = req.body;
        
        const user = await User.findOne({ email })
        if (user) {
            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true,
            })

            const token = createToken(user._id.toString(), user.email, "7d");
            const expires = new Date()
            expires.setDate(expires.getDate() + 7);

            res.cookie(COOKIE_NAME, token, {
                path: '/',
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            })

            return res.status(201).json({
               success:true, message: "ok sign-in successfully", username: user.username, email: user.email, photo: user.photo, id: user._id
            })
        } else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const user = new User({ username, email, password: hashedPassword, photo })
           
            await user.save()


            res.clearCookie(COOKIE_NAME, {
                path: "/",
                domain: "localhost",
                httpOnly: true,
                signed: true,
            })

            const token = createToken(user._id.toString(), user.email, "7d");
            const expires = new Date()
            expires.setDate(expires.getDate() + 7);

            res.cookie(COOKIE_NAME, token, {
                path: '/',
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true,
            })




           
            return res.status(201).json({
              success:true,  message: "ok sign-in successfully", username: user.username, email: user.email, photo: user.photo, id: user._id
            })

        }

    } catch (error) {
       
        next(error)
    }

}



/*****======Sign-out =====**** */

export const signOut=async(req,res,next)=>{
    try {
        const user=await User.findById(res.locals.jwtData.id);

        if(!user){
            return res.status(401).json({success:false,message:"User not registered or token mulfunctioned"})
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).json({success:false,message:"Permissions didn't match"})
        }
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        })

        return res.status(200).json({
            success:true,
            message:"OK, Logout successfully"
        })

    } catch (error) {
        // return res.status(400).json({
        //     message:"error occur in signout"
        // })
        next(error)
        
    }

}

