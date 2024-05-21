import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddBook, AllBooks, Author } from './index';
import { AuthorContextProvider } from '../context/AuthorContext/AuthorContext';

const AuthorRoutes = () => {
    return (
        <AuthorContextProvider>
            <Routes>
                <Route path='/' element={<Author />} />
                <Route path='/add-book' element={<AddBook />} />
                <Route path='/all-books' element={<AllBooks />} />
            </Routes>
        </AuthorContextProvider>
    );
};

export default AuthorRoutes;
