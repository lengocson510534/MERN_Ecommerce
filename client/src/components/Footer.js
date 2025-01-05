import React from 'react'
import icons from '../utils/icons'
import { menu_info_footer, menu_whoareyou_footer } from '../utils/contants'

const { MdEmail, FaFacebookF, FaGoogle, FaInstagram, FaPinterest, FaTwitter, FaCcMastercard, SiVisa, FaCcPaypal, FaCcDiscover } = icons

const Footer = () => {
  return (
    <>
      <div className='w-full bg-main flex items-center justify-center text-white py-[25px]'>
        <div className='w-main flex items-center'>
          <span className='flex flex-col flex-1'>
            <span className='text-[20px] tracking-widest'>SIGN UP TO NEWSLETTER</span>
            <span className='text-[13px] text-[#b7b7b7] font-light'>Subscribe now and receive weekly newsletter</span>
          </span>
          <div className='flex items-center flex-1'>
            <input
              type="email"
              name="email"
              id="email_footer"
              className='bg-[#ffffff1a] h-[50px] rounded-l-[30px] px-[20px] w-full outline-none border-none text-[14px] placeholder-[#b7b7b7] placeholder:font-extralight'
              placeholder='Email address' />
            <span className='h-[50px] bg-[#ffffff1a] flex items-center justify-center cursor-pointer pr-[20px] rounded-r-[30px]'>
              <MdEmail size={18} color='white' />
            </span>
          </div>
        </div>
      </div>
      <div className='w-full bg-[#191919] py-[50px] flex items-center justify-center text-white'>
        <div className='w-main'>
          <div className='w-full flex gap-[20px]'>
            <div className='w-2/5 flex flex-col'>
              <span className='text-[15px] mb-[15px] font-medium pl-[15px] border-l-[4px] border-l-main'>ABOUT US</span>
              <span className='text-[13px] mb-[10px]'>
                Address:
                <span className='text-[#b7b7b7] '> Go Vap TP.Ho Chi Minh</span>
              </span>
              <span className='text-[13px] mb-[10px]'>
                Phone:
                <span className='text-[#b7b7b7] ' > (+1234)56789xxx</span>
              </span>
              <span className='text-[13px] mb-[10px]'>
                Mail:
                <span className='text-[#b7b7b7] '> sondev@gmail.com</span>
              </span>
              <div className='flex items-center gap-[6px]'>
                <span className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded text-white cursor-pointer'>
                  <FaFacebookF />
                </span>
                <span className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded text-white cursor-pointer'>
                  <FaTwitter />
                </span>
                <span className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded text-white cursor-pointer'>
                  <FaGoogle />
                </span>
                <span className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded text-white cursor-pointer'>
                  <FaInstagram />
                </span>
                <span className='w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded text-white cursor-pointer'>
                  <FaPinterest />
                </span>





              </div>
            </div>
            <div className='w-1/5 flex flex-col'>
              <span className='text-[15px] mb-[15px] font-medium pl-[15px] border-l-[4px] border-l-main'>
                INFORMATION
              </span>
              {menu_info_footer?.map(el => (
                <span
                  key={el._id}
                  className='text-[13px] mb-[10px] text-[#b7b7b7] cursor-pointer hover:text-white'
                >
                  {el.title}
                </span>
              ))}
            </div>
            <div className='w-1/5 flex flex-col'>
              <span className='text-[15px] mb-[15px] font-medium pl-[15px] border-l-[4px] border-l-main'>
                WHO WE ARE
              </span>
              {menu_whoareyou_footer?.map(el => (
                <span
                  key={el._id}
                  className='text-[13px] mb-[10px] text-[#b7b7b7] cursor-pointer hover:text-white'
                >
                  {el.title}
                </span>
              ))}
            </div>
            <div className='w-1/5 '>
              <span className='text-[15px] mb-[15px] font-medium pl-[15px] border-l-[4px] border-l-main uppercase'>#DigitalWorldStore</span>
            </div>
          </div>
          <div className='pt-[30px] mt-[30px] border-t border-t-[#8f8e8e]'>
            <span className='text-[15px] mb-[15px] font-medium pl-[15px] border-l-[4px] border-l-main'>
              PRODUCT TAGS
            </span>
          </div>
        </div>
      </div>
      <div className='w-full bg-[#0f0f0f] flex items-center justify-center'>
        <div className='w-main flex items-center justify-between py-[15px]'>
          <span className='text-[#b7b7b7] text-[12px] font-extralight'>
            © 2024, Clone Digital World 2 Powered by SonDev
          </span>
          <div className='flex items-center gap-6 text-white'>
            <SiVisa size={40} />
            <FaCcMastercard size={40} />
            <FaCcPaypal size={40} />
            <FaCcDiscover size={40} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer