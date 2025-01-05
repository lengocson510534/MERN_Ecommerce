import React from 'react'
import { formatMoney, renderStarFromNumber } from '../utils/helpers'

const ProductCard = ({ price, totalRatings, title, image }) => {
  return (
    <div className='w-[30%] border flex-auto p-[15px] flex gap-2 items-center'>
      <img src={image} alt="product" className='w-[120px] object-contain' />
      <div className='flex flex-col gap-2 mt-[15px] items-start w-full text-xs'>
        <span className='line-clamp-1 capitalize text-sm'>{title?.toLowerCase()}</span>
        <span className='flex items-start justify-center h-[16px]'>
          {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}
        </span>
        <span>{`${formatMoney(price)} VNĐ`}</span>
      </div>
    </div>
  )
}

export default ProductCard