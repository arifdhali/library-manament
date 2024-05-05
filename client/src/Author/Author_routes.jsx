import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AddBook, AllBooks, Author } from './index'


const Author_routes = () => {
    return (
        <Routes>

            <Route path='/' element={<Author />} />
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/all-books' element={<AllBooks />} />

        </Routes>
    )
}

export default Author_routes