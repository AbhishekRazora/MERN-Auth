import React from 'react'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { app } from '../Firebase';








export default function GithubOauth() {

  const handleGithubClick=async(e)=>{
    e.preventDefault()

    try {
      const provider= new GithubAuthProvider()
      const auth=getAuth(app)
      const result=await signInWithPopup(auth,provider)
      console.log(result)
      console.log(result.user)
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    <button type='button' onClick={handleGithubClick} className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>Continue with github</button>
  )
}
