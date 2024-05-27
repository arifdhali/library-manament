import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Book = (props) => {
  const { book_id, title, authors, publication, price, thumbnail } = props.book;

  const handelCheckout = (e) => {
    console.log(e);
  };


  return (
    <div className="book-item shadow-lg p-5 rounded ">
      <img className="mx-auto rounded" src={`http://localhost:4000/books/${thumbnail}`} alt={title} />
      <div className="book-desc">
        <div className=" mt-3">
          <h4 className="text-lg font-semibold">
            Name: <span className="font-normal">{title}</span>{" "}
          </h4>
          <h4 className="text-lg font-semibold">
            Author: <span className="font-normal">{authors}</span>{" "}
          </h4>
          <h4 className="text-lg font-semibold">
            Publish: <span className="font-normal"> {publication} </span>{" "}
          </h4>
          <h4 className="text-lg font-semibold">
            Price:<span className="font-normal">${price}</span>
          </h4>
        </div>

        <div className="flex mt-6 justify-between gap-2 items-center w-100">
          <Link
            to={`/book/${book_id}`}
            className="hover:bg-black hover:border-black rounded border-2 border-sky-600 px-5 py-1 text-white bg-sky-600"
          >
            View
          </Link>
          <Link
            onClick={handelCheckout}
            to={`/cart/${book_id}`}
            className="rounded shadow-lg border-2 border-slate-600 hover:bg-white hover:text-red-600 bg-slate-600 px-5 py-1 text-white"
          >
            Buy
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Book;
