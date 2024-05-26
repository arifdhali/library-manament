import React, { useEffect, useState } from "react";
import Book from "../components/Books/Book";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const redirect = useNavigate();
  const [books, setBooks] = useState([]);
  axios.defaults.withCredentials = true;
  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/");
      if (response.status === 200) {
        setBooks(response.data);
      } else {
        console.error("Error fetching data: ", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <section className="home-top">
        <div className="container">
          <div className="top flex justify-between p-2">
            <div className="left">
              <h2>
                <span className="font-semibold text-red-500 text-2xl">
                  {books.data && books.data.length}
                </span>{" "}
                item{books.data && books.data.length > 1 ? "s" : ""} found
              </h2>
            </div>
            <div className="right">
              <h3>Filter</h3>
              <select className="border border-indigo-600" name="" id="">
                <option value="">New </option>
                <option value="">New </option>
                <option value="">New </option>
                <option value="">New </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="book-list m-5">
        <div className="container grid grid-cols-4 justify-between gap-7">
          {books.data ? (
            books.data.map((book, i) => <Book key={book.book_id} book={book} />)
          ) : (
            <p>No books available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
