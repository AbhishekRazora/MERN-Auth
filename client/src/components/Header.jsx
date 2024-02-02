import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-200'>
     <div className='flex justify-between mx-auto p-3 items-center'>
       <Link to='/'>
       
       <h1 className='font-bold'>Auth App</h1>
       </Link> 
        <ul className='flex gap-9 mr-11 font-medium'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/sign-in'>Sign In</Link></li>
            
        </ul>
     </div>
    </div>
  )
}
