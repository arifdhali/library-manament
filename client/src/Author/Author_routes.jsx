import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import { AddBook, AllBooks, Author } from './index'


const Author_routes = () => {
    const [isAuthor, setIsAuthor] = useState(false);

    const fetchAuthor = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/author`);
            if (response.status === 200) {
                setIsAuthor(true);
            } else {
                console.error("Error fetching data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchAuthor();
    }, []);

    return (

        <Routes>
           {isAuthor ? (
                <>
                    <Route path='/' element={<Author />} />
                    <Route path='/add-book' element={<AddBook />} />
                    <Route path='/all-books' element={<AllBooks />} />
                </>
            ) : (
                <Route path='*' element={<h1>Please log in to access this page</h1>} />
            )}
        </Routes>
    )
}

export default Author_routes;


