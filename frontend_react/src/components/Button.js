import React from 'react'

const Button = ({ text, style, onClick }) => {
  return (
    <button
    className={style}
    onClick={onClick}
    type='submit'
    >
        {text}
    </button>
  )
}

export default Button