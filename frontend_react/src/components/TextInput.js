// library
import React from 'react'

const TextInput = ({ name, label }) => {


  return (
    <div className='w-full mx-auto'>
        <label className='label-dft' htmlFor={name}>{label}</label>
        <input
        className='form-elt-dft input-dft'
        type='text'
        name={name}
        />
    </div>
  )
}

export default TextInput