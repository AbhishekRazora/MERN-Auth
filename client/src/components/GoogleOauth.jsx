import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from '../Firebase';
import { signInWithGoogle } from '../helpers/api-communicator.jsx';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
export default function GoogleOauth() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleGoogleClick=async(e)=>{
        try {
e.preventDefault()
            const provider = new GoogleAuthProvider();
            const auth=getAuth(app)
            const result=await signInWithPopup(auth,provider)
          
            const data =await signInWithGoogle({
                username:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL,
            })
            dispatch(signInSuccess(data))
           
            navigate("/")

        } catch (error) {
            console.log("could not login with google",error)
            
        }
    }
  return (
   <button type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75' onClick={handleGoogleClick}>Continue with google</button>
  )
}
