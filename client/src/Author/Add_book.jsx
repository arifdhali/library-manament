import React, { useState } from 'react';
import Author_module from './Components/Author_module';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Add_book = () => {
    const [addBook, setAddBook] = useState({
        title: "",
        authors: "",
        publication: "",
        plot: "",
        themes: "",
        impact: "",
        legacy: "",
        thumbnail: "",
        price: "",
        previewProfile: ""
    });

    

    // Success and error toasts
    const successLogin = (message) => toast.success(message);
    const errorLogin = (message) => toast.error(message);

    // Handle input change
    const handleAddBook = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail") {
            setAddBook({
                ...addBook,
                [name]: files[0],
                previewProfile: URL.createObjectURL(files[0])
            });
        } else {
            setAddBook({
                ...addBook,
                [name]: value
            });
        }
    };

    // Handle form submission
    const handleAddbookSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in addBook) {
            formData.append(key, addBook[key]);
        }
        try {
            const response = await axios.post(`${process.env.REACT_API_BASE_URL}/author/add-books/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status) {
                successLogin(response.data.message);
                // Reset form fields
                setAddBook({
                    title: "",
                    authors: "",
                    publication: "",
                    plot: "",
                    themes: "",
                    impact: "",
                    legacy: "",
                    thumbnail: "",
                    price: "",
                    previewProfile: ""
                });
            } else {
                errorLogin(response.data.message);
            }
        } catch (error) {
            errorLogin(error.response?.data?.message || 'Something went wrong');
        }
    };

    // Destructuring the obj from addBook
    const { title, authors, publication, plot, themes, impact, legacy, thumbnail, previewProfile, price } = addBook;
    console.log(addBook)
    return (
        <>
            <Author_module />
            <Toaster />
            <section className="add-book p-10">
                <form onSubmit={handleAddbookSubmit} className='w-3/5 m-auto'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add your book</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={title} onChange={handleAddBook} type="text" name="title" id="title" autoComplete="title" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Story of example" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="authors" className="block text-sm font-medium leading-6 text-gray-900">Authors</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={authors} onChange={handleAddBook} type="text" name="authors" id="authors" autoComplete="authors" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Harper Lee" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="publication" className="block text-sm font-medium leading-6 text-gray-900">Publication</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={publication} onChange={handleAddBook} type="date" name="publication" id="publication" autoComplete="publication" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="plot" className="block text-sm font-medium leading-6 text-gray-900">Plot</label>
                                    <div className="mt-2">
                                        <textarea value={plot} onChange={handleAddBook} id="plot" name="plot" rows="3" className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required></textarea>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="themes" className="block text-sm font-medium leading-6 text-gray-900">Themes</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={themes} onChange={handleAddBook} type="text" name="themes" id="themes" autoComplete="themes" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Book themes" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="impact" className="block text-sm font-medium leading-6 text-gray-900">Impact</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={impact} onChange={handleAddBook} type="text" name="impact" id="impact" autoComplete="impact" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Impact" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="legacy" className="block text-sm font-medium leading-6 text-gray-900">Legacy</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={legacy} onChange={handleAddBook} type="text" name="legacy" id="legacy" autoComplete="legacy" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Legacy" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">Book photo</label>
                                    {!thumbnail ? (
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                        <span>Upload a file</span>
                                                        <input onChange={handleAddBook} id="thumbnail" name="thumbnail" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="after-upload">
                                            <div>
                                                <img src={previewProfile} alt="Uploaded Thumbnail" className="w-2/5 object-cover mx-auto rounded-lg max-h-64" />
                                            </div>
                                            <div className="mt-4 text-sm leading-6 text-gray-600 text-center">
                                                <label htmlFor="thumbnail" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Re-Upload photo</span>
                                                    <input onChange={handleAddBook} id="thumbnail" name="thumbnail" type="file" className="sr-only" />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input value={price} onChange={handleAddBook} type="number" name="price" id="price" autoComplete="price" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Price" required />
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

export default Add_book;
