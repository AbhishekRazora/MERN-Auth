import User from "../models/user.model.js";
// import { hashSync } from "bcryptjs";
import bcryptjs from "bcryptjs"
import { COOKIE_NAME } from "../utils/constant.js";
import { createToken } from "../utils/token-manager.js";
export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const existingUser = await User.findOne({ email })

        // if(existingUser){
        //     return(
        //         res.status(401).send('user already registered')
        //     )
        // }
        if (existingUser) {
            return (
                res.status(401).json({
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
            message: "ok user created", username: user.username, email: user.email, id: user._id, photo: user.photo
        })
    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     message:"Error comes in signup",cause:error.message
        // })
        next(error)
    }

}
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // const hashedPassword=bcryptjs.hashSync(password,10);

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not registered" })
        }

        const isPasswordCorrect = bcryptjs.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Incorrect credentials" })

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
            message: "ok sign-in successfully", username: user.username, email: user.email, id: user._id, photo: user.photo
        })
    } catch (error) {
        console.log(error)
        // return res.status(500).json({
        //     message:"Error comes in signup",cause:error.message
        // })
        next(error)
    }

}
export const signWithGoogle = async (req, res, next) => {
    try {
        const { username, email, photo } = req.body;
        // const hashedPassword=bcryptjs.hashSync(password,10);
        // console.log({username,email,photo})
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
                message: "ok sign-in successfully", username: user.username, email: user.email, photo: user.photo, id: user._id
            })
        } else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const user = new User({ username, email, password: hashedPassword, photo })
            // console.log(user)
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




            // console.log(user.username)
            return res.status(201).json({
                message: "ok sign-in successfully", username: user.username, email: user.email, photo: user.photo, id: user._id
            })

        }

    } catch (error) {
        // console.log(error)
        // return res.status(500).json({
        //     message:"Error comes in signup",cause:error.message
        // })
        next(error)
    }

}

