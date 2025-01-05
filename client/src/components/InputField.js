import React from 'react'


const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidFields, placeholder, icon }) => {
  return (
    <div className='w-full flex items-center relative'>
      {value.trim() !== '' && <label
        className='px-1 animate-slide-top-sm absolute top-[-15%] left-[14px] text-[10px]'
        htmlFor={nameKey}
      >
        {placeholder}
      </label>}
      <span className='bg-[#E5E4E2] text-main rounded-l-xl p-3 h-[45px]'>
        {icon}
      </span>
      <input
        type={type || 'text'}
        name=''
        className='w-full bg-[#E5E4E2] rounded-r-xl py-3 pr-3 outline-none border-none text-[14px] placeholder-[#b7b7b7] placeholder:font-extralight'
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
      />
    </div>
  )
}

export default InputField