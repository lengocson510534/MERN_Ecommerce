import React from 'react'
import { Sidebar, Banner, BestSeller, DealDally, FeatureProducts, CustomSlider } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'

const { MdOutlineKeyboardArrowRight } = icons

const Home = () => {
  const { newProducts } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.app)

  return (
    <>
      <div className='w-main flex'>
        <div className='flex flex-col gap-5 w-[25%] flex-auto'>
          <Sidebar />
          <DealDally />
        </div>
        <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className='my-8'>
        <FeatureProducts />
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] mb-[20px] py-[15px] border-b-2 border-main font-semibold'>NEW ARRIVALS</h3>
        <div className='mx-[-10px]'>
          <CustomSlider
            products={newProducts}
          />
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] mb-[20px] py-[15px] border-b-2 border-main font-semibold'>HOT COLLECTIONS</h3>
        <div className='w-full flex flex-wrap gap-[20px]'>
          {categories?.filter(el => el.brand?.length > 0).map(el => (
            <div
              key={el._id}
              className='w-[393.333px] border p-[15px] flex gap-[20px] min-h-[228px]'
            >
              <img
                src={el?.image}
                alt="thumb"
                className='w-[50%] object-contain flex-1'
              />
              <div className='flex-1'>
                <h4 className='font-semibold uppercase mb-[10px] text-[14px]'>{el?.title}</h4>
                <ul>
                  {el?.brand?.map(item => (
                    <li
                      key={item}
                      className='text-[#808080] font-light text-[14px] mb-[5px] flex items-center cursor-pointer hover:text-main'
                    >
                      <MdOutlineKeyboardArrowRight size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-8 w-full'>
        <h3 className='text-[20px] mb-[20px] py-[15px] border-b-2 border-main font-semibold'>BLOG POTS</h3>
      </div>
    </>
  )
}

export default Home