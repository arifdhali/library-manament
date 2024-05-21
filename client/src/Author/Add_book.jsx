import React, { useState } from 'react'
import Author_module from './Components/Author_module'
import axios from 'axios'

const Add_book = () => {
    const [addBook, setAddBook] = useState({
        title: "",
        authors: "",
        publication: "",
        plot: "",
        themes: "",
        impact: "",
        legacy: "",
        bookPhoto: "",
        price: ""
    })


    // get value
    const handleAddBook = (e) => {
        const { name, value } = e.target;
        setAddBook({
            ...addBook,
            [name]: value
        });
    }


    const handleAddbookSubmit = async (e) => {
        e.preventDefault();
        let response = await axios.post("http://localhost:4000/author/all-books", addBook);
        console.log(response);
    }





    return (
        <>
            <Author_module />

            <section className="add-book p-10">
                <form onSubmit={handleAddbookSubmit} className='w-3/5  m-auto'>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl  font-semibold leading-7 text-gray-900">Add your book</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

                            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="text" name="title" id="title" autoComplete="title" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Story of example" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="authors" className="block text-sm font-medium leading-6 text-gray-900">Authors</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="text" name="authors" id="authors" autoComplete="authors" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Harper Lee" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="publication" className="block text-sm font-medium leading-6 text-gray-900">Publication</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="date" name="publication" id="publication" autoComplete="publication" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="12/03/2020" />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="plot" className="block text-sm font-medium leading-6 text-gray-900">Plot</label>
                                    <div className="mt-2">
                                        <textarea onChange={handleAddBook} id="plot" name="plot" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="themes" className="block text-sm font-medium leading-6 text-gray-900">Themes</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="text" name="themes" id="themes" autoComplete="themes" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Book themes" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="impact" className="block text-sm font-medium leading-6 text-gray-900">Impact</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="text" name="impact" id="impact" autoComplete="impact" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Impact" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="legacy" className="block text-sm font-medium leading-6 text-gray-900">Legacy</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="text" name="legacy" id="legacy" autoComplete="legacy" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Legacy" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Book photo</label>
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
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                                            <input onChange={handleAddBook} type="number" name="price" id="price" autoComplete="price" className="block flex-1 border-0 bg-transparent py-1.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Price" />
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
    )
}

export default Add_book