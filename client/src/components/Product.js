import React, { useState } from 'react'
import { formatMoney } from '../utils/helpers'
import label from '../assets/label_2.png'
import label_blue from '../assets/label_3.png'
import { renderStarFromNumber } from '../utils/helpers'
import { SelectOption } from '../components'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const { FaHeart, FaEye, MdOutlineMenu } = icons

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link
        className='w-full border p-[15px] flex flex-col items-center hover:cursor-pointer'
        to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
        onMouseEnter={e => {
          e.stopPropagation()
          setIsShowOption(true)
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          setIsShowOption(false)
        }}
      >
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-4 animate-slide-top'>
            <SelectOption icon={<FaHeart />} />
            <SelectOption icon={<MdOutlineMenu />} />
            <SelectOption icon={<FaEye />} />
          </div>}
          <img src={productData?.thumb || 'https://bepharco.com/no-products-found.png'} alt="" className='w-[274px] h-[274px] object-cover' />
          <img src={isNew ? label : label_blue} alt="label" className='absolute top-[-13px] right-[-10px] w-[50px] object-cover' />
          {isNew ?
            <span className='font-bold absolute top-[7px] right-[-3px] text-white'>new</span> : <span className='font-bold text-[14px] absolute top-[7px] right-[-3px] text-white'>Trend</span>
          }
        </div>
        <div className='flex flex-col gap-2 mt-[15px] items-start w-full'>
          <span className='flex items-start justify-center h-[16px]'>
            {renderStarFromNumber(productData?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span>{`${formatMoney(productData?.price)} VNĐ`}</span>
        </div>
      </Link>
    </div>
  )
}

export default Product