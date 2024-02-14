// import axios from "axios";



/*****======Sign-up =====**** */

// export const signupUser=async({username,email,password})=>{
    
//         const res=await axios.post('/api/v1/auth/sign-up',{username,email,password})
//         if(res.status!==201){
//             throw new Error("Unable to Sign up")

//         }
//         const data=await res.data;
//         return data;
        
 

// }

export const signupUser=async ({username,email,password})=>{
    const res=await fetch(`/api/v1/auth/sign-up`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({username,email,password})
    })
    const data=await res.json()
    return data;
}


/*****======Sign-in =====**** */

// export const signinUser=async({email,password})=>{
    
//         const res=await axios.post('/api/v1/auth/sign-in',{email,password})
//         if(res.status!==201){
//             throw new Error("Unable to Sign in")

//         }
//         const data=await res.data;
//         return data;
        
   

// }

export const signinUser=async({email,password})=>{
    const res=await fetch(`/api/v1/auth/sign-in`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password})
    })
    const data=await res.json()
    return data;

}


/*****======Sign-in with google =====**** */

// export const signInWithGoogle=async({username,email,photo})=>{
//     // console.log({username,email,photo})
// const res=await axios.post("/api/v1/auth/google",{username,email,photo})
// const data=await res.data;
// return data;
// }
export const signInWithGoogle=async({username,email,photo})=>{
    // console.log({username,email,photo})
    const res=await fetch(`/api/v1/auth/google`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({username,email,photo})
    })
    const data=await res.json()
    return data;
}



/*****======Update the user profile =====**** */

// export const updateUserProfile=async({username,email,password,photo,id})=>{
//     console.log({username,email,photo,id})
// const res=await axios.post(`/api/v1/user/update/${id}`,{username,email,password,photo})
// const data=await res.data;
// return data;
// }
export const updateUserProfile=async({username,email,password,photo,id})=>{
    const res=await fetch(`/api/v1/user/update/${id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({username,email,password,photo})
    })
    const data=await res.json()
    return data;
}


/*****======Delete the user =====**** */

// export const deleteUser=async(id)=>{
//     // console.log({username,email,photo,id})
// const res=await axios.delete(`/api/v1/user/delete/${id}`)
// const data=await res.data;
// return data;
// }

export const deleteUser=async(id)=>{
    const res=await fetch(`/api/v1/user/delete/${id}`,{
        method:'DELETE',
    })
    const data=await res.json();
    return data;
}

/*****======Sign-out the user =====**** */

// export const signOutUser=async()=>{
//     const res=await axios.get('/api/v1/auth/sign-out')
//     // const data=await res.data;
//     // return data;
// }


export const signOutUser=async ()=>{
    
        await fetch('/api/v1/auth/sign-out')
    //    const data=await res.json();
    //    return data;
    
}



