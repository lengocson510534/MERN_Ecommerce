import React, { memo } from 'react'
import Slider from 'react-slick'
import { Product } from './'

const CustomSlider = ({ products, activeTab }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }
  return (
    <>
      {products &&
        <Slider {...settings}>
          {products?.map((el, index) => (
            <Product
              key={index}
              productData={el}
              isNew={activeTab === 1 ? false : true}
            />
          ))}
        </Slider>
      }
    </>
  )
}

export default memo(CustomSlider)