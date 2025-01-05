import React, { memo } from 'react'

const Countdown = ({ unit, number }) => {
  return (
    <div className='h-[60px] w-[30%] flex-auto flex flex-col justify-center items-center bg-[#f4f4f4] rounded-sm'>
      <span className='font-semibold text-[18px]'>{number}</span>
      <span className='text-[12px] text-[#8b8b8b]'>{unit}</span>
    </div>
  )
}

export default memo(Countdown)