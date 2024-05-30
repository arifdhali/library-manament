import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AddBook, AllBooks, Author, EditBook } from './index';
import { AuthorContextProvider } from '../context/AuthorContext/AuthorContext';

const AuthorRoutes = () => {
    return (
        <AuthorContextProvider>
            <Routes>
                <Route path='/' element={<Author />} />
                <Route path='/add-book' element={<AddBook />} />
                <Route path='/all-books' element={<AllBooks />} />
                <Route path='/all-books/edit-book/:id' element={<EditBook />} />
            </Routes>
        </AuthorContextProvider>
    );
};

export default AuthorRoutes;
