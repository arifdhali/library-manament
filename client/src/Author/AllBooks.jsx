import React from 'react'
import Author_module from './Components/Author_module'

const AllBooks = () => {
    return (
        <>
            <Author_module />
            <section className='w-3/5 m-autow-4/12 m-auto py-10'>

                <table className=" text-left border-collapse border border-slate-400">
                    <thead>
                        <tr>
                            <th className=" w-2/5 py-2 px-8 border  border-slate-300">Title</th>
                            <th className="w-1/5 border py-2 px-8 border-slate-300">Publish Date</th>
                            <th className="w-1/10 border py-2 px-8 border-slate-300">Price</th>
                            <th className="w-1/6 border py-2 px-8 border-slate-300">Status</th>
                            <th className="w-1/12 border py-2 px-8 border-slate-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border py-2 px-8 border-slate-300">Booke name</td>
                            <td className="border py-2 px-8 border-slate-300">12-03-2021</td>
                            <td className="border py-2 px-8 border-slate-300"> <span>₹</span> 500</td>
                            <td className="border py-2 px-8 border-slate-300">
                                <select className='bookStatus activeBook px-5 py-2 focus-visible:border-0 focus-visible:outline-none' name="" id="">
                                    <option value="1">Active</option>
                                    <option value="2">Deactive</option>
                                </select>


                            </td>
                            <td className='text-center border border-slate-300'>
                                <button className='px-2 py-2 w-1/3 text-white bg-red-600'>X</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="border py-2 px-8 border-slate-300">Booke name</td>
                            <td className="border py-2 px-8 border-slate-300">12-03-2021</td>
                            <td className="border py-2 px-8 border-slate-300"><span>₹</span> 200</td>
                            <td className="border py-2 px-8 border-slate-300">
                                <select className='bookStatus deactiveBook px-5 py-2 focus-visible:border-0 focus-visible:outline-none' name="" id="">
                                    <option value="1">Active</option>
                                    <option value="2" selected>Deactive</option>
                                </select>


                            </td>
                            <td className='text-center border  border-slate-300'>
                                <button className='px-2 py-2 w-1/3 text-white bg-red-600'>X</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AllBooks