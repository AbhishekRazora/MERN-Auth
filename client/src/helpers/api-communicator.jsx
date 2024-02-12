import axios from "axios";



/*****======Sign-up =====**** */

export const signupUser=async({username,email,password})=>{
    
        const res=await axios.post('/auth/sign-up',{username,email,password})
        if(res.status!==201){
            throw new Error("Unable to Sign up")

        }
        const data=await res.data;
        return data;
        
 

}

/*****======Sign-in =====**** */

export const signinUser=async({email,password})=>{
    
        const res=await axios.post('/auth/sign-in',{email,password})
        if(res.status!==201){
            throw new Error("Unable to Sign in")

        }
        const data=await res.data;
        return data;
        
   

}


/*****======Sign-in with google =====**** */

export const signInWithGoogle=async({username,email,photo})=>{
    // console.log({username,email,photo})
const res=await axios.post("/auth/google",{username,email,photo})
const data=await res.data;
return data;
}



/*****======Update the user profile =====**** */

export const updateUserProfile=async({username,email,password,photo,id})=>{
    console.log({username,email,photo,id})
const res=await axios.post(`/user/update/${id}`,{username,email,password,photo})
const data=await res.data;
return data;
}


/*****======Delete the user =====**** */

export const deleteUser=async(id)=>{
    // console.log({username,email,photo,id})
const res=await axios.delete(`/user/delete/${id}`)
const data=await res.data;
return data;
}


/*****======Sign-out the user =====**** */

export const signOutUser=async()=>{
    const res=await axios.get('/auth/sign-out')
    const data=await res.data;
    return data;
}



