// src/components/Author_module.js
import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../pages';
import axios from 'axios';
import { useAuthorContext } from '../../context/AuthorContext/AuthorContext';


const Author_module = () => {
    // Author Context
    const {username}  = useAuthorContext();

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleLogout = async () => {
        try {
            let response = await axios.get('http://localhost:4000/logout');
            if (response.data.status) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error on logout:', error);
        }
    };


    return (
        <aside id="default-sidebar" className="bg-black fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-5">
                <ul className="space-y-2 font-medium">
                    <li className='text-center mb-6 text-white'>
                        <Link to="/author" className="mt-0 p-2 text-gray rounded-lg group">
                            <img src={Logo} className='w-2/5 mb-3 mx-auto rounded-full shadow-xl' alt="Logo" />
                            <strong>{username}</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="/author/all-books" className="flex items-center p-2 text-white rounded-lg hover:text-gray-900 hover:bg-gray-100 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">All Books</span>
                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">3</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/author/add-book" className="flex items-center p-2 rounded-lg text-white hover:text-gray-900 hover:bg-gray-100 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Add Book</span>
                        </Link>
                    </li>
                    <li className='logout'>
                        <Link to="/logout" onClick={handleLogout} className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 hover:text-gray-900 group">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                            </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Author_module;
