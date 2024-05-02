import React from 'react'
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    return (
        <ul className='menu flex justify-end items-center'>
            <li className='menu-items ps-8 pe-8'>
                <Link className='text-white hover:text-red-400' to={'/'}>Home</Link>
            </li>
            <li className='menu-items ps-8 pe-8'>
                <Link className='text-white hover:text-red-400' to={'/shop'}>Shop</Link>
            </li>
            <li className='menu-items ps-8 '>
                <Link className='text-white text-lg hover:text-red-400 relative' to={'/cart'}><FaShoppingCart /> <span className='cart-count text-xs absolute bg-blue-600'>5</span></Link>
            </li>
            <li className='menu-items ps-8 '>
                <Link className='text-white hover:text-red-400' to={'/login'}>Login</Link>
            </li>
        </ul>
    )
}

export default Navbar
