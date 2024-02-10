import { Outlet,Navigate } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";

export default function ProtedLayout() {
    const {currentUser}=useSelector(state=>state.user)

    if(!currentUser){
        return <Navigate to="/sign-in" state={{message:"Please sign-in first before access this page."}}/>
    }
  return (
    <Outlet/>
  )
}
