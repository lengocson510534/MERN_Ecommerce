import React, { useEffect, useState } from 'react'
import { ProductCard } from './'
import { apiGetProducts } from '../apis'
import banner_1 from '../assets/banner_1.png'
import banner_2 from '../assets/banner_2.png'
import banner_3 from '../assets/banner_3.png'
import banner_4 from '../assets/banner_4.png'



const FeatureProducts = () => {
  const [products, setProducts] = useState(null)
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 })
    if (response.success) setProducts(response.products)
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='w-full'>
      <h3 className='text-[20px] py-[15px] border-b-2 border-main font-semibold'>FEATURE PRODUCTS</h3>
      <div className='flex flex-wrap mt-[15px] gap-6'>
        {products?.map(el => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className='flex gap-[20px] mt-5'>
        <img src={banner_1} alt="banner" />
        <div className='flex flex-col justify-between gap-[20px] w-[25%]'>
          <img src={banner_2} alt="banner" className='h-[50%]' />
          <img src={banner_3} alt="banner" className='h-[50%]' />
        </div>
        <img src={banner_4} alt="banner" className='w-[25%] object-contain' />
      </div>
    </div>
  )
}

export default FeatureProducts