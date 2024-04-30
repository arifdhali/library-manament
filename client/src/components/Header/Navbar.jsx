import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <ul className='menu flex justify-end'>
            <li className='menu-items ps-8 pe-8'>
                <Link className='text-white hover:text-red-400' to={'/'}>Home</Link>
            </li>
            <li className='menu-items ps-8 pe-8'>
                <Link className='text-white hover:text-red-400' to={'/shop'}>Shop</Link>
            </li>
            <li className='menu-items ps-8 '>
                <Link className='text-white hover:text-red-400' to={'/checkout'}>Checkout</Link>
            </li>
            <li className='menu-items ps-8 '>
                <Link className='text-white hover:text-red-400' to={'/login'}>Login</Link>
            </li>
        </ul>
    )
}

export default Navbar
