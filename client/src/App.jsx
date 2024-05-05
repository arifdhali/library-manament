import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
  AuthorRoutes,
} from "./pages";
import { DNA } from 'react-loader-spinner';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname;
  useEffect(() => {
    setLoading(false);
  }, [location]);

  return (
    <>
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
          {renderHeader(location)}
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Singup />} />
              <Route path="/books/:id" element={<Booksingle />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/author/*" element={<AuthorRoutes />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
{/* rendering the header */ }

const renderHeader = (pathname) => {
  if (!pathname.includes('author')) {
    return <Header />;
  }
};

export default App;
