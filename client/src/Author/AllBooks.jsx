import React, { useEffect, useState } from 'react';
import Author_module from './Components/Author_module';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [removeBook, setRemoveBook] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectBook, setSelectBook] = useState();

    const successLogin = (message) => toast.success(message);
    const errorLogin = (message) => toast.error(message);

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API_BASE_URL}/author/all-books`);
            if (response.status === 200) {

                let books = response.data.all_books.map((book) => {
                    return {
                        ...book,
                        status: book.status.toString()
                    }
                })
                setAllBooks(books)
            } else {
                console.error("Error fetching data: ", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    axios.defaults.withCredentials = true;

    const handleStatus = async (e, book_id) => {
        const { value } = e.target;
        try {
            const response = await axios.patch(`${process.env.REACT_API_BASE_URL}/author/all-books/${book_id}`, {
                status: value
            });
            if (response.status === 200) {
                successLogin(response.data.message);
                setAllBooks((prevBooks) =>
                    prevBooks.map((book) => {
                        return book.book_id === book_id ? { ...book, status: value } : book
                    })
                );

            } else {
                errorLogin(response.data.message);
                console.error("Error updating status: ", response.statusText);
            }
        } catch (error) {
            console.error("Error updating status: ", error);
            errorLogin(error.response?.data?.message || 'Something went wrong');
        }
    };

    // HANDLE DELETE BUTTONS
    const handeliDeleteButton = (itemId) => {
        setModal(true);
        setSelectBook(itemId);
    }

    // HANDEL DELETE
    const handleDelete = async () => {
        setRemoveBook(true);
        if (removeBook) {
            let response = await axios.delete(`${process.env.REACT_API_BASE_URL}/author/all-books/delete-book/${selectBook}`)
            if (response.data.status) {
                successLogin(response.data.message);
                setAllBooks((allBooks) => {
                    return allBooks.filter((book) => {
                        return book.book_id !== selectBook
                    })
                });
                setModal(false);
            } else {
                errorLogin(response.data.message);
            }

        }



    }

    // HANDLE CLOSE BUTTON
    const handleClose = () => {
        setModal(false);
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <>
            <Author_module />
            <Toaster />
            <section className="w-3/5 m-auto py-10">
                <table className="text-left border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="text-center w-2/9 py-2 px-8 border border-slate-300">ID</th>
                            <th className="w-2/6 py-2 px-8 border border-slate-300">Title</th>
                            <th className="w-1/5 py-2 px-8 border border-slate-300">Publish Date</th>
                            <th className="w-1/10 py-2 px-8 border border-slate-300">Price</th>
                            <th className="w-1/6 py-2 px-8 border border-slate-300">Status</th>
                            <th className="w-1/12 py-2 px-8 border border-slate-300">Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {allBooks && allBooks.length > 0 ? (
                            allBooks.map((book) => {
                                const { book_id, title, publication, price, status } = book;
                                return (
                                    <tr key={book_id}>
                                        <td className="text-center border py-2 px-8 border-slate-300">{book_id}</td>
                                        <td className="border py-2 px-8 border-slate-300">{title}</td>
                                        <td className="border py-2 px-8 border-slate-300">{publication}</td>
                                        <td className="border py-2 px-8 border-slate-300"><span>₹</span> {price}</td>
                                        <td className="border py-2 px-8 border-slate-300">
                                            <form className="update-status" onSubmit={(e) => e.preventDefault()}>
                                                <select
                                                    onChange={(e) => handleStatus(e, book_id)}
                                                    className={`bookStatus ${status === '1' ? "activeBook" : "deactiveBook"} px-5 py-2 focus-visible:border-0 focus-visible:outline-none`}
                                                    value={status}
                                                >
                                                    <option value="1">Active</option>
                                                    <option value="0">Deactive</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td className="text-center border border-slate-300">
                                            <div className='flex align-center gap-3 justify-center '>
                                                <Link to={`edit-book/${book_id}`} className="text w-1/3 p-2 rounded-lg text-white bg-sky-600 ">
                                                    <FaRegEdit className='mx-auto text-lg h-100' />
                                                </Link>
                                                <Link onClick={() => handeliDeleteButton(book_id)} className="w-1/3 p-2 rounded-lg text-white bg-pink-600">
                                                    <MdDelete className='mx-auto text-lg h-100' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="border py-2 px-8 border-slate-300 text-center text-xl text-red-600 text-600">No Book available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {
                    modal && (



                        <div className="visible fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-8 shadow-lg w-1/4">

                                <h2 className="text-xl font-semibold">Delete Confirmation</h2>
                                <h3 className='text-lg'>Book name: </h3>
                                <p className="mt-4">Are you sure you want to delete <span className="font-bold"></span>?</p>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button onClick={handleClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
                                    <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
        </>
    );
}

export default AllBooks;
