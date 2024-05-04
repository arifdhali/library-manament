import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  Header,
  Footer,
  Home,
  Shop,
  Login,
  Booksingle,
  Error,
  Cart,
  Singup,
  AddBook,
  Author_admin,

} from "./components/pages";
import { DNA } from 'react-loader-spinner'
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        <>
          <Header />
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Singup />} />
              <Route path="/books/:id" element={<Booksingle />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/author" element={<Author_admin />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;
