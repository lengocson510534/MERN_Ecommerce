import React from 'react'
import banner from '../assets/banner.png'

const Banner = () => {
  return (
    <div className='w-full'>
      <img src={banner} alt="banner" className='w-full object-cover h-[487px]' />
    </div>
  )
}

export default Banner