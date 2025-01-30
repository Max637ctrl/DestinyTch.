/* eslint-disable no-unused-vars */
import React from 'react'
import logo from "../assets/logo.png"
import profile from "../assets/profile.jpg"

const Navbar = () => {
  return (
    <div className='max-padd-container flexBetween py-2'>
        <img src={logo} height={200} width={200 } />
        <img src={profile} height={60} width={60} className='rounded-full' />
    </div>
  )
}

export default Navbar
