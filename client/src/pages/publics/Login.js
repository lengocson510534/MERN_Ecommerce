import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputField, Button } from '../../components'
import { apiRegister, apiLogin } from '../../apis/user'
import { ToastContainer, toast } from 'react-toastify'
import icons from '../../utils/icons'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'


const { MdEmail, CiLock, FaUser, MdLocalPhone } = icons

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobile: ''
  })
  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      mobile: ''
    })
  }

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phone, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      console.log(response)
      if (!response?.success) toast(response.mes)
      if (response.success) {
        toast('Tạo tài khoản thành công')
        setIsRegister(false)
        resetPayload()
      }
    } else {
      const rs = await apiLogin(data)
      if (!rs?.success) toast(rs.mes)
      if (rs.success) {
        dispatch(register({
          isLoggedIn: true,
          token: rs.accessToken,
          userData: rs.userData
        }))
        toast('Đăng nhập thành công')
        navigate(`/${path.HOME}`)
      }
    }
  }, [payload, isRegister])

  return (
    <div className='h-screen w-screen relative'>
      <ToastContainer />
      <img
        src="https://img.freepik.com/free-vector/realistic-abstract-technology-particle-background_23-2148431263.jpg?t=st=1735489560~exp=1735493160~hmac=2cd0ebe06123eb9c3004e3d90b346a5d415e632f48df1d6c87bbc5f8cff0f782&w=1800"
        alt="background"
        className='w-full h-full object-cover'
      />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl border w-[400px] bg-slate-100 py-6 px-8  shadow-xl'>
        <p className='text-center mb-4'>
          {isRegister ? 'Register' : 'Sign in with email'}
        </p>
        {isRegister && <div className='mb-5'>
          <InputField
            value={payload.firstName}
            setValue={setPayload}
            placeholder='First Name'
            nameKey='firstName'
            icon={<FaUser size={20} />}
          />
        </div>}
        {isRegister && <div className='mb-5'>
          <InputField
            value={payload.lastName}
            setValue={setPayload}
            placeholder='Last Name'
            nameKey='lastName'
            icon={<FaUser size={20} />}
          />
        </div>}
        {isRegister && <div className='mb-5'>
          <InputField
            value={payload.mobile}
            type='number'
            setValue={setPayload}
            placeholder='Mobile'
            nameKey='mobile'
            icon={<MdLocalPhone size={20} />}
          />
        </div>}
        <div className='mb-5'>
          <InputField
            value={payload.email}
            setValue={setPayload}
            placeholder='Email'
            type='email'
            nameKey='email'
            icon={<MdEmail size={20} />}
          />
        </div>
        <div className='mb-5'>
          <InputField
            value={payload.password}
            setValue={setPayload}
            placeholder='Password'
            type='password'
            nameKey='password'
            icon={<CiLock size={20} />}
          />
        </div>
        {!isRegister && <div className='w-full flex items-center justify-between '>
          <span
            className='w-full inline-block font-extralight text-[14px] cursor-pointer mb-3'
            onClick={() => setIsRegister(true)}
          >
            Create account
          </span>
          <span className='w-full text-right inline-block font-extralight text-[14px] cursor-pointer mb-3'>
            Forgot password?
          </span>
        </div>}
        <Button
          name={isRegister ? 'Register' : 'Login'}
          handleOnClick={handleSubmit}
        />
        {isRegister &&
          <Button
            name='Cancel'
            handleOnClick={() => setIsRegister(false)}
          />}
      </div>
    </div>
  )
}

export default Login