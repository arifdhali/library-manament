// Booksingle.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Booksingle = () => {
    const { id } = useParams(); 

    
    
  
    return (
        <div className="container mx-auto mt-5">
          <h1>{id}</h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
                {/* <img src={book.image} alt={book.title} className="mx-auto rounded-lg" />
                <h2 className="text-2xl font-bold mt-4">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-gray-800 mt-2">Price: {book.price}</p>
                <p className="text-gray-800 mt-4">{book.description}</p> */}
            </div>
        </div>
    );
}

export default Booksingle;
