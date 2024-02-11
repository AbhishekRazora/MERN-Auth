import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
export const updateUser=async(req,res,next)=>{
console.log(res.locals)
console.log(res.locals.jwtData)
    if(res.locals.jwtData.id !== req.params.id){
        return res.status(401).json({message:"You can update only your account!"})
    }
    try {
        // const user=await User.findById(res.locals.jwtData.id)
        // console.log(user)
        // console.log(res.locals.jwtData)
        // console.log(res.locals)
        // return res.status(200).json({
        //     message:"OK",user
        // })
if(req.body.password){
    req.body.password= bcryptjs.hashSync(req.body.password,10)
}
       const updatedUser=await User.findByIdAndUpdate(req.params.id,
        {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                photo:req.body.photo 
            }

       },
       {new:true}
       );
    //    const {password, ...rest}=updatedUser._doc;
    //    res.status(200).json(rest);
    res.status(200).json({ message: "ok user updated", username: updatedUser.username, email: updatedUser.email,id:updatedUser._id,photo:updatedUser.photo})
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"error",cause:error.message
        })
    }
}


export const deleteUser=async(req,res,next)=>{
    if(res.locals.jwtData.id !== req.params.id){
        return res.status(401).json({message:"You can delete only your account!"})
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User has been deleted..."})
    } catch (error) {
        next(error)
        
    }
}