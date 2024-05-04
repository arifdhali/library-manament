import React from "react";
import { Link } from "react-router-dom";

const Book = (props) => {
  const { book_id, title, authors, publication, price, thumbnail } = props.book;

  const handelCheckout = (e) => {
    console.log(e);
  };

  return (
    <div className="book-item hover:bg-red-400 shadow-lg p-5 rounded ">
      <img className="mx-auto rounded" src={thumbnail} alt={title} />
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
        </div>
        <div className="text-center mt-6 flex justify-between items-center">
          <h4 className="text-lg font-semibold">
            Rate:$<span className="font-normal">{price}</span>
          </h4>
          <div className="flex gap-2 items-center">
            <Link
              to={`/books/${book_id}`}
              className="hover:bg-black hover:border-black rounded border-2 border-sky-600 px-5 py-1 text-white bg-sky-600"
            >
              View
            </Link>
            <Link
              onClick={handelCheckout}
              to={`/cart/${book_id}`}
              className="rounded shadow-lg border-2 border-slate-600 hover:bg-white hover:text-red-600 bg-slate-600 px-5 py-1 text-white"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
