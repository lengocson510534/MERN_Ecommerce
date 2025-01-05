import React from 'react'
import logo from '../assets/logo.png'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const Header = () => {
  const { MdLocalPhone, MdEmail, FaUser, MdShoppingBag } = icons
  return (
    <div className='w-main h-[110px] py-[35px] flex items-center justify-between'>
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className='w-[234px] object-contain' />
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex flex-col items-center px-5 border-r'>
          <span className='flex items-center gap-3'>
            <MdLocalPhone color='red' />
            <span className='font-semibold'>(+1800) 000 8808</span>
          </span>
          <span className='text-xs'>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center px-5 border-r'>
          <span className='flex items-center gap-3'>
            <MdEmail color='red' />
            <span className='font-semibold'>support@gmail.com</span>
          </span>
          <span className='text-xs'>Online Support 24/7</span>
        </div>
        <div className='flex items-center gap-2 justify-center px-5 border-r hover:text-main cursor-pointer'>
          <MdShoppingBag color='red' size={25} />
          <span>0 items</span>
        </div>
        <div className='flex items-center justify-center px-5 cursor-pointer hover:text-main'>
          <FaUser size={24} />
        </div>
      </div>
    </div>
  )
}

export default Header