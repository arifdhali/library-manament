import React, { useEffect, useState } from 'react';
import Author_module from './Components/Author_module';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


import toast, { Toaster } from 'react-hot-toast';

const AllBooks = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [status, setStatus] = useState({ status: "" });
    const successLogin = (message) => toast.success(message);
    const errorLogin = (message) => toast.error(message);

    const getAllBooks = async () => {
        try {
            const response = await axios.get("http://localhost:4000/author/all-books");
            if (response.status === 200) {
                setAllBooks(response.data.all_books);
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
        setStatus((prev) => ({
            ...prev,
            status: value
        }));

        try {
            const response = await axios.patch(`http://localhost:4000/author/all-books/${book_id}`, {
                status: value
            });
            if (response.status === 200) {
                successLogin(response.data.message)
            } else {
                errorLogin(response.data.message);
                console.error("Error updating status: ", response.statusText);
            }
        } catch (error) {
            console.error("Error updating status: ", error);
            errorLogin(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        getAllBooks()
    }, [allBooks]);

    return (
        <>
            <Author_module />
            <Toaster />
            <section className="w-3/5 m-auto py-10">
                <table className="text-left border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className="w-2/5 py-2 px-8 border border-slate-300">Title</th>
                            <th className="w-1/5 border py-2 px-8 border-slate-300">Publish Date</th>
                            <th className="w-1/10 border py-2 px-8 border-slate-300">Price</th>
                            <th className="w-1/6 border py-2 px-8 border-slate-300">Status</th>
                            <th className="w-1/12 border py-2 px-8 border-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBooks && allBooks.map((book) => {
                            const { book_id, title, publication, price, status } = book;
                            return (
                                <tr key={book_id}>
                                    <td className="border py-2 px-8 border-slate-300">{title}</td>
                                    <td className="border py-2 px-8 border-slate-300">{publication}</td>
                                    <td className="border py-2 px-8 border-slate-300"><span>₹</span> {price}</td>
                                    <td className="border py-2 px-8 border-slate-300">
                                        <form className="update-status" onSubmit={(e) => e.preventDefault()}>
                                            <select
                                                onChange={(e) => handleStatus(e, book_id)}
                                                className={`bookStatus ${status === 1 ? "activeBook" : "deactiveBook"} px-5 py-2 focus-visible:border-0 focus-visible:outline-none`}
                                                value={status}
                                            >
                                                <option value="1">Active</option>
                                                <option value="0">Deactive</option>
                                            </select>
                                        </form>
                                    </td>
                                    <td className="text-center border border-slate-300">
                                        <div className='flex align-center gap-3 justify-center '>
                                            <button className="text w-1/3 text-white bg-green-600"><FaRegEdit className='mx-auto text-lg' />
                                            </button>
                                            <button className="w-1/3 text-white bg-red-600"><MdDelete className='mx-auto text-lg' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default AllBooks;
