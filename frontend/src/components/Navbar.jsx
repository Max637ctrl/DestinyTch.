/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { MdCategory, MdContacts, MdHomeFilled, MdMail, MdShop2 } from 'react-icons/md'

const Navbar = ({ containerStyles }) => {

  const [isActive, setIsActive] = useState("home")

  return (
    <nav className={`${containerStyles}`}>
      <a
        href={'/'}
        onClick={() => setIsActive("home")}
        className={isActive==="home"? "active-link" : ""}>
        <div className='flexCenter gap-x-6'>
          <MdHomeFilled /> Home
        </div>
      </a>
      <a
        href={'/#shop'}
        onClick={() => setIsActive("shop")}
        className={isActive==="shop"? "active-link" : ""}>
        <div className='flexCenter gap-x-6'>
          <MdCategory /> Shop
        </div>
      </a>

      <a
        href={'../#app'}
        onClick={() => setIsActive("app")}
        className={isActive==="app"? "active-link" : ""}>
        <div className='flexCenter gap-x-6'>
          <MdShop2 /> Get App
        </div>
      </a>

    {/*  <a
        href={'/#footer'}
        onClick={() => setIsActive("contact")}
        className={isActive==="contact"? "active-link" : ""}>
        <div className='flexCenter gap-x-6'>
          <MdContacts /> Contact
        </div>
      </a>
*/}

      <a
        href={'https://wa.me/08063250438'}
        onClick={() => setIsActive("message")}
        className={isActive==="message"? "active-link" : ""}>
        <div className='flexCenter gap-x-6'>
          <MdMail /> Message
        </div>
      </a>
    </nav>
  )
}


export default Navbar;
