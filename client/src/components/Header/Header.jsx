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
