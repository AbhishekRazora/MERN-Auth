import axios from "axios";
// import { useSelector } from "react-redux";



export const signupUser=async({username,email,password})=>{
    // try {
        const res=await axios.post('/auth/sign-up',{username,email,password})
        if(res.status!==201){
            throw new Error("Unable to Sign up")

        }
        const data=await res.data;
        return data;
        
    // } catch (error) {
    //     // console.log(error.response)
    //     // console.log(error.response.data)
    //     // throw new Error("Something went wrong in sign up the user")
    //     throw new Error(error)
        
    // }

}
export const signinUser=async({email,password})=>{
    // try {
        const res=await axios.post('/auth/sign-in',{email,password})
        if(res.status!==201){
            throw new Error("Unable to Sign in")

        }
        const data=await res.data;
        return data;
        
    // } catch (error) {
    //     // console.log(error.response)
    //     // console.log(error.response.data)
    //     // throw new Error("Something went wrong in sign up the user")
    //     throw new Error(error)
        
    // }

}

export const signInWithGoogle=async({username,email,photo})=>{
    console.log({username,email,photo})
const res=await axios.post("/auth/google",{username,email,photo})
const data=await res.data;
return data;
}



export const updateUserProfile=async({username,email,password,photo,id})=>{
    console.log({username,email,photo,id})
const res=await axios.post(`/user/update/${id}`,{username,email,password,photo})
const data=await res.data;
return data;
}



