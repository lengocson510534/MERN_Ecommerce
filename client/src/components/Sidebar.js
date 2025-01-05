import React from 'react'
import { NavLink } from 'react-router-dom'
import { createSlug } from '../utils/helpers'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const { categories } = useSelector(state => state.app)
  return (
    <div className='flex flex-col border rounded-sm shadow-sm h-[487px]'>
      {categories?.map(el => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) => isActive ? 'bg-main hover:text-main text-white px-5 pt-[15px] pb-[14px] text-[14px]' : 'px-5 pt-[15px] pb-[14px] text-[14px] text-[#1C1D1D] hover:text-main'}
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar