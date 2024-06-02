import React, { useEffect, useState } from 'react';
import Author_module from './Components/Author_module';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBook = () => {
    const successToast = (message) => toast.success(message);
    const errorToast = (message) => toast.error(message);


    const [book, setBook] = useState({
        title: '',
        authors: '',
        publication: '',
        plot: '',
        themes: '',
        impact: '',
        legacy: '',
        price: '',
        thumbnail: '',
        previewProfile: ""
    });

    const { id } = useParams();

    const getSelectedBooks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_API_BASE_URL}/author/all-books/edit-book/${id}`);
            if (response.status === 200) {
                if (response.data && response.data.length > 0) {
                    const bookData = response.data[0];
                    setBook(bookData);
                } else {
                    console.log("No book found or empty response.");
                }
            }
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook((prevEdit) => ({
            ...prevEdit,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBook((prevEdit) => ({
            ...prevEdit,
            thumbnail: file,
            previewProfile: URL.createObjectURL(file)
        }));
    };
    const handleAddbookSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in book) {
            formData.append(key, book[key]);
        }

        try {
            const response = await axios.put(`${process.env.REACT_API_BASE_URL}/author/all-books/edit-book/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                successToast("Book updated successfully!");
            } else {
                errorToast("Failed to update book.");
            }
        } catch (error) {
            errorToast("Error updating book: " + error.message);
        }
    };

    useEffect(() => {
        getSelectedBooks();
    }, []);


    const { title, authors, publication, plot, themes, impact, legacy, price, thumbnail, previewProfile } = book;
    console.log(previewProfile)

    return (
        <>
            <Toaster />
            <Author_module />
            <section className="add-book p-10">
                <form onSubmit={handleAddbookSubmit} className='w-3/5 m-auto'>
                    <div className="space-y-12">
                        <div className="pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Edit your book</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={title} type="text" name="title" id="title" autoComplete="title" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Story of example" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="authors" className="block text-sm font-medium leading-6 text-gray-900">Authors</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={authors} type="text" name="authors" id="authors" autoComplete="authors" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Harper Lee" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="publication" className="block text-sm font-medium leading-6 text-gray-900">Publication</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={publication} type="date" name="publication" id="publication" autoComplete="publication" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="plot" className="block text-sm font-medium leading-6 text-gray-900">Plot</label>
                                    <div className="mt-2">
                                        <textarea onChange={handleInputChange} value={plot} id="plot" name="plot" rows="3" className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="themes" className="block text-sm font-medium leading-6 text-gray-900">Themes</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={themes} type="text" name="themes" id="themes" autoComplete="themes" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Book themes" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="impact" className="block text-sm font-medium leading-6 text-gray-900">Impact</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={impact} type="text" name="impact" id="impact" autoComplete="impact" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Impact" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="legacy" className="block text-sm font-medium leading-6 text-gray-900">Legacy</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={legacy} type="text" name="legacy" id="legacy" autoComplete="legacy" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Legacy" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">Book photo</label>
                                    {!thumbnail ? (
                                        <div className="before-upload">
                                            <div>
                                                <img src={previewProfile} alt="Uploaded Thumbnail" className="object-cover w-2/5 mx-auto rounded-lg max-h-64" />
                                            </div>
                                            <div className="mt-4 text-sm leading-6 text-gray-600 text-center">
                                                <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Re-Upload photo</span>
                                                    <input id="thumbnail" name="thumbnail" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="after-upload">
                                            <div>
                                                <img src={`${process.env.REACT_API_BASE_URL}/books/${thumbnail}`} alt="Uploaded Thumbnail" className="object-cover w-2/5 mx-auto rounded-lg max-h-64" />
                                            </div>
                                            <div className="mt-4 text-sm leading-6 text-gray-600 text-center">
                                                <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Re-Upload photo</span>
                                                    <input id="thumbnail" name="thumbnail" type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input onChange={handleInputChange} value={price} type="number" name="price" id="price" autoComplete="price" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Price" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditBook;
