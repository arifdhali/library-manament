import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BookSingle = () => {



  const [book, setBook] = useState({});
  const { id } = useParams();

  const fetchBookById = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_API_BASE_URL}/book/${id}`);
      if (response.status === 200) {
        setBook(response.data[0]);
      } else {
        console.error("Error fetching data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchBookById();
  }, [id]);

  return (
    <div className="container mx-auto mt-5">
      {book && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
          <img
            src={`${process.env.REACT_API_BASE_URL}/books/${book.thumbnail}`}
            alt={book.title}
            className="mx-auto rounded-lg h-96 min-w-full object-cover"
          />
          <h2 className="text-2xl font-bold mt-4">{book.title}</h2>
          <p className="text-gray-600">by {book.authors}</p>
          <p className="text-gray-600">{book.publication}</p>
          <p className="text-gray-800 mt-2">Price: ${book.price}</p>
          <p className="text-gray-800 mt-4">{book.plot}</p>
          <div className="mt-10">
            <Link
              to={"/checkout"}
              className="rounded bg-red-600 text-white p-2  hover:bg-slate-900"
            >
              Buy now
            </Link>
            <Link className="ms-2 rounded bg-blue-500 text-white p-2  hover:bg-gray-900" to={"/"}>Back</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSingle;
