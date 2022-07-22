import React from 'react'

const Button = ({ text, styling, onClick }) => {
  return (
    <button
    className={styling}
    onClick={onClick}
    type='submit'
    >
        {text}
    </button>
  )
}

export default Button