import React, { memo } from 'react'

const Button = ({ name, handleOnClick, style, iconsBefore, iconsAfter }) => {
  return (
    <button
      type='button'
      className={style ? style : 'w-full rounded-xl text-[14px] p-3 text-white bg-main font-semibold mb-3'}
      onClick={() => { handleOnClick && handleOnClick() }}
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  )
}

export default memo(Button)