import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { apiGetProducts } from '../apis/product'
import { formatMoney, renderStarFromNumber } from '../utils/helpers'
import { CountDown } from '../components'

const { FaStar, MdOutlineMenu } = icons
let idInterval

const DealDally = () => {
  const [dealDally, setDealDally] = useState(null)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expireTime, setExpireTime] = useState(false)

  const fetchDealDally = async () => {
    const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 })
    if (response.success) {
      setDealDally(response.products[0])
      const h = 24 - new Date().getHours()
      const m = 60 - new Date().getMinutes()
      const s = 60 - new Date().getSeconds()
      setHour(h)
      setMinute(m)
      setSecond(s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }
  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDally()
  }, [expireTime])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond(prev => prev - 1)
      } else {
        if (minute > 0) {
          setMinute(prev => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour(prev => prev - 1)
            setMinute(59)
            setSecond(59)
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [hour, minute, second])

  return (
    <div className='w-full border flex-auto p-[20px]'>
      <div className='flex items-center justify-between mb-[50px]'>
        <span className='flex-1'><FaStar size={20} className='text-main' /></span>
        <span className='flex-2 font-bold text-[20px] text-center'>DALLY DEALS</span>
        <span className='flex-1'></span>
      </div>
      <div className='w-full flex flex-col items-center gap-2'>
        <img
          src={dealDally?.thumb || 'https://bepharco.com/no-products-found.png'}
          alt="banner"
          className='w-full object-contain mb-2'
        />
        <span className='line-clamp-1'>{dealDally?.title}</span>
        <span className='flex items-start justify-center h-[16px]'>
          {renderStarFromNumber(dealDally?.totalRatings, 20)}
        </span>
        <span>{`${formatMoney(dealDally?.price)} VNĐ`}</span>
      </div>
      <div>
        <div className='flex items-center justify-start gap-2 my-5'>
          <CountDown unit={'Hours'} number={hour} />
          <CountDown unit={'Minutes'} number={minute} />
          <CountDown unit={'Seconds'} number={second} />
        </div>
        <button
          type='button'
          className='flex items-center justify-center gap-2 w-full bg-main text-white hover:bg-gray-700 font-medium text-[14px] px-[15px] py-[11px]'
        >
          <MdOutlineMenu />
          <span>OPTIONS</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDally)