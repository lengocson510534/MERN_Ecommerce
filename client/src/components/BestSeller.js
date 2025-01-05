import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../apis/product'
import { CustomSlider } from '../components'
import { getNewProducts } from '../store/products/asyncAction'
import { useDispatch, useSelector } from 'react-redux'

const BestSeller = () => {
  const [bestSellers, setBestSeller] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const [products, setProducts] = useState(null)
  const dispatch = useDispatch()
  const { newProducts } = useSelector(state => state.products)

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: '-sold' })
    if (response?.success) {
      setBestSeller(response.products)
      setProducts(response.products)
    }
  }
  useEffect(() => {
    fetchProducts()
    dispatch(getNewProducts())
  }, [])
  useEffect(() => {
    if (activeTab === 1) setProducts(bestSellers)
    if (activeTab === 2) setProducts(newProducts)
  }, [activeTab])
  return (
    <div>
      <div className='flex items-center text-[20px] font-semibold pb-[15px] mb-[20px] border-b-2 border-b-main'>
        <span
          className={`cursor-pointer ${activeTab === 1 ? 'text-[#151515]' : 'text-gray-500'}`}
          onClick={() => setActiveTab(1)}
        >
          BEST SELLER
        </span>
        <span
          className={`pl-[20px] ml-[20px] border-l cursor-pointer ${activeTab === 2 ? 'text-[#151515]' : 'text-gray-500'}`}
          onClick={() => setActiveTab(2)}
        >
          NEW ARRIVAL
        </span>
      </div>
      <div className='mx-[-10px]'>
        <CustomSlider
          products={products}
          activeTab={activeTab}
        />
      </div>
      <div className='w-full flex gap-6 mt-4'>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className='flex-1 object-cover cursor-pointer'
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className='flex-1 object-cover cursor-pointer'
        />
      </div>
    </div>
  )
}

export default BestSeller