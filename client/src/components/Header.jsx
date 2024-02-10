import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
  
  return (
    <div className='bg-slate-200'>
     <div className='flex justify-between mx-auto p-3 items-center'>
       <Link to='/'>
       
       <h1 className='font-bold'>Auth App</h1>
       </Link> 
        <ul className='flex gap-9 mr-11 font-medium'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/protected'>Protected</Link></li>
            <li>
              {currentUser?(
                <Link to='/profile'>
                
                <img src={currentUser.photo} alt="profile" className='h-7 rounded-full object-cover' />
                </Link>
              ):(

              <Link to='/sign-in'>Sign In</Link>
              )}
              </li>
            
        </ul>
     </div>
    </div>
  )
}
