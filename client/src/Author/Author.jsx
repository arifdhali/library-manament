import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Author_module from './Components/Author_module'
import axios from 'axios'

const Author = () => {
    const [author, setAuthor] = useState('');
    const [islogin, setIslogin] = useState(false);
    axios.defaults.withCredentials = true;
    const redirect = useNavigate();
    const getAuthor = async () => {
        let response = await axios.get("http://localhost:4000/author");
        if (response.data.status) {
            setAuthor(response.data.author_data);
            setIslogin(true);
        } else {
            redirect("/login");
            setIslogin(false);
        }
    }
    useEffect(() => {
        getAuthor();
    }, [])


    return (
        <>
            {islogin && (
                <>
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <Author_module author={author} />

                    <div className="p-4 sm:ml-64">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                    <Link to={"all-books/"} className="text-2xl text-gray-400 dark:text-gray-500">
                                        Publish boooks
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                    <Link to={"sales/"} className="text-2xl text-gray-400 dark:text-gray-500">
                                        Total Sales
                                    </Link>
                                </div>
                                <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </p>
                            </div>

                        </div>
                    </div>
                </>

            )}
        </>
    )
}

export default Author;