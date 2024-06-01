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

    const successLogin = (message) => toast.success(message);
    const errorLogin = (message) => toast.error(message);

    const getAllBooks = async () => {
        try {
            const response = await axios.get(`${process.env.RECT_API_BASE_URL}/author/all-books`);
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
            const response = await axios.patch(`${process.env.RECT_API_BASE_URL}/author/all-books/${book_id}`, {
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
        console.log(itemId);

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
                            <th className="w-2/9 py-2 px-8 border border-slate-300">ID</th>
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
                                        <td className="border py-2 px-8 border-slate-300">{book_id}</td>
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


                {/* <div className='w-2/4 bg-slate-600 rounded-xl'>
                    <h4>Book title</h4>
                    <p>Sure want to delete ?</p>

                    <button>Confirm</button>
                    <button>Cancel</button>
                </div> */}
            </section>
        </>
    );
}

export default AllBooks;
