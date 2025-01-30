import React from 'react'

import { Link } from 'react-router-dom'
import {RiFacebookFill, RiInstagramFill, RiMailAddFill, RiTiktokFill, RiTwitterXFill} from 'react-icons/ri'

const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={''} className='text-[#08d9d6] text-2xl hover:-translate-y-1 transition-all duration-300'> <RiFacebookFill /> </Link>
        <Link to={''} className='text-[#f08a5d] text-2xl hover:-translate-y-1 transition-all duration-300'> <RiInstagramFill /> </Link>
        <Link to={''} className='text-[#ff263] text-2xl hover:-translate-y-1 transition-all duration-300'> <RiTwitterXFill /> </Link>    
        <Link to={''} className='text-[#eaeaea] text-2xl hover:-translate-y-1 transition-all duration-300'> <RiTiktokFill /> </Link>
        <Link to={''} className='text-[#f9ed69] text-2xl hover:-translate-y-1 transition-all duration-300'>  <RiMailAddFill /> </Link>
        <Link to={''} className='text-[#5272f2] text-2xl hover:-translate-y-1 transition-all duration-300'> <RiTwitterXFill /> </Link>
    </div>
  )
}

export default SocialIcons
