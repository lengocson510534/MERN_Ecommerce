import React from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const { FaFacebookF, FaGoogle, FaTwitter, FaInstagram, FaPinterest } = icons

const TopHeader = () => {
  return (
    <div className='w-full bg-main text-[12px] flex items-center justify-center py-[10px]'>
      <div className='w-main flex items-center justify-between text-white font-light'>
        <div>
          <span className='pr-[10px]'>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
          <span className='px-[10px] border-l border-[#e5e7eb]'>VND</span>
        </div>
        <div className='flex items-center'>
          <Link to={`/${path.LOGIN}`} className='px-[10px] cursor-pointer hover:text-black'>
            Sign in or Create Account
          </Link>
          <span className='border-l border-l-[#e5e7eb] px-[10px] cursor-pointer hover:text-black'>
            <FaFacebookF size={12} />
          </span>
          <span className='border-l border-l-[#e5e7eb] px-[10px] cursor-pointer hover:text-black'>
            <FaTwitter size={12} />
          </span>
          <span className='border-l border-l-[#e5e7eb] px-[10px] cursor-pointer hover:text-black'>
            <FaInstagram size={12} />
          </span>
          <span className='border-l border-l-[#e5e7eb] px-[10px] cursor-pointer hover:text-black'>
            <FaGoogle size={12} />
          </span>
          <span className='border-l border-l-[#e5e7eb] px-[10px] cursor-pointer hover:text-black'>
            <FaPinterest size={12} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopHeader