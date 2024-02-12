import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { signupUser } from '../helpers/api-communicator'
import {toast} from "react-hot-toast"
import GoogleOauth from '../components/GoogleOauth.jsx'



export default function Signup() {
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)



/*****====== Function for handle the submit =====**** */

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    toast.loading("Signing Up",{id:"signup"})
    setIsLoading(true)
    setError(null)
      
       const user=await signupUser( formData )
       if(user){
        
          toast.success("Signed up Successfully",{id:"signup"})
        
       }
       navigate("/sign-in")
     console.log(user)

    } catch (error) {
      console.log(error)
      toast.error("signing up failed",{id:"signup"})
      setIsLoading(false)
      setError(error)

    }finally{
      
      setIsLoading(false)
      setFormData({
        username: "",
        email: "",
        password: "",

      })
    }
  }


/*****====== Handle change function =====**** */

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (

    <div className='p-3 mt-10   mx-auto max-w-xl'>
      <h1 className='text-center font-bold text-2xl my-7'>Signup</h1>
      {error&& <h3 className='text-2xl text-red-600 font-semibold'>{error.response.data.message}</h3>}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='username' id='username' name='username' value={formData.username} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' />
        <input type="email" placeholder='email' id='email' name='email' value={formData.email} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' />
        <input type="password" placeholder='password' id='password' name='password' value={formData.password} onChange={handleChange} className='bg-slate-200 p-3 rounded-lg focus:outline-none' />
        <button disabled={isLoading?true:false} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>{isLoading?"Loading...":"Sign up"}</button>
      
        <GoogleOauth/>
        
     
      </form>
      <div className='mt-5'>
        <p className='font-semibold'>Have an account?
          <Link to='/sign-in'><span className='text-blue-700 ml-2'>Sign in</span></Link>
        </p>
      </div>

    </div>
  )
}
