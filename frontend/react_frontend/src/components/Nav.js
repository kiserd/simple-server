// library
import React from 'react';

// component
import Button from './Button'
import Navlink from './Navlink'

const Nav = () => {
    // having some fun with array.map() below
    const navLinks = [
        {route: '/', name: 'Home', id: 1},
        {route: '/create', name: 'Create', id: 2},
        {route: '/meals', name: 'Meals', id: 3},
        {route: '/ingredients', name: 'Ingredients', id: 4},
    ]
  return (
    <div className="bg-custom-card mb-5 p-2 flex flex-row items-center">
        <div className='basis-2/3'>
            <div className='flex flex-row justify-start'>
                {navLinks.map((link) => {
                    return <Navlink key={link.id} route={link.route} name={link.name} />
                })}
            </div>
        </div>
        <div className='basis-1/3'>
            <div className='flex flex-row justify-end'>
                <Button text='Login' />
            </div>
        </div>
    </div>
  )
}

export default Nav