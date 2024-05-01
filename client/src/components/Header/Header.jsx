import React from "react";
import Logo from "../../../public/images/logo.jpg";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-header">
      <div className="container">
        <div className="flex items-center justify-between header-content p-2">
          <div className="left w-1/5">
            <Link to={"/"}>
              <img className="w-24" src={Logo} alt="" />
            </Link>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
              placeholder="Search book name"
            />
          </div>
          <div className="right w-2/5">
            <nav>
              <Navbar />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
