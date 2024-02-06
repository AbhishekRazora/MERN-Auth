import axios from "axios";

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