import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { authUser, Userprovider } from "./context/context";

function Layout() {
  const [isAuth, setIsAuth] = useState(true);

  const checkAuth = (auth) => {
    setIsAuth(auth);
  };

  return (
    <>
      <Userprovider value={{ isAuth, checkAuth }}>
        <Navbar />
        <Outlet />
        <Footer />
      </Userprovider>
    </>
  );
}

export default Layout;
