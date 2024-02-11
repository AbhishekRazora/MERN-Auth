
import React, { useState } from 'react'
import { Link ,redirect,useLocation,useNavigate} from 'react-router-dom'
import { signinUser } from '../helpers/api-communicator.jsx'
import {toast} from "react-hot-toast"

import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import GoogleOauth from '../components/GoogleOauth.jsx'
import GithubOauth from '../components/GithubOauth.jsx'

export default function Signin() {


const navigate=useNavigate()
const dispatch=useDispatch()
const location=useLocation()


  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  })
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)
const {isLoading,error}=useSelector((state)=>state.user)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    toast.loading("Signing In",{id:"signin"})
    dispatch(signInStart())
    // setIsLoading(true)
    // setError(null)
      
       const user=await signinUser( formData )
       if(user){
        
          toast.success("Signed in Successfully",{id:"signin"})
          dispatch(signInSuccess(user))
          
        
       }
     console.log(user)
navigate("/",{replace:true})
    } catch (error) {
      console.log(error)
      toast.error("signing in failed",{id:"signin"})
      // setIsLoading(false)
      // setError(error)
      dispatch(signInFailure(error))

    }finally{
      
      // setIsLoading(false)
      setFormData({
        username: "",
        email: "",
        password: "",

      })
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const message=location.state?.message
  return (

    <div className='p-3 mt-10   mx-auto max-w-xl'>
      <h1 className='text-center font-bold text-2xl my-7'>Sign In</h1>
      {error&& <h3 className='text-2xl text-red-600 font-semibold'>{error.message}</h3>}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {message&& <h3 className='text-2xl text-red-600 font-semibold'>{message}</h3>}
        {/* <input type="text" placeholder='username' id='username' name='username' value={formData.username} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' /> */}
        <input type="email" placeholder='email' id='username' name='email' value={formData.email} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' />
        <input type="password" placeholder='password' id='username' name='password' value={formData.password} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' />
        <button disabled={isLoading?true:false} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>{isLoading?"Loading...":"Sign in"}</button>
        {/* <button className='bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>Sign in with google</button>
        <button className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>Sign in with facebook</button>
        <button className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>Sign in with github</button> */}
        <GoogleOauth/>
        
        <GithubOauth/>
      </form>
      <div className='mt-5'>
        <p className='font-semibold'> Don&#39;t have an account?
          <Link to='/sign-up'><span className='text-blue-700 ml-2'>Sign up</span></Link>
        </p>
      </div>

    </div>
  )
}
