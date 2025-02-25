import React from "react";
import { Link, NavLink } from "react-router-dom";
import { authUser } from "../context/context";

function Navbar() {
  const { isAuth, checkAuth } = authUser(); // Ensure checkAuth is available

  const handleLogout = () => {
    checkAuth(false); // Call checkAuth to update the auth state
  };

  console.log("auth:", isAuth);

  if (isAuth) {
    return (
      // For authenticated users
      <header className="w-full flex justify-between items-center p-5 bg-blue-600 text-white">
        <div className="text-2xl font-bold">ResumeBuilder</div>
        <nav className="flex space-x-4 gap-4">
          <Link to="/dashboard" className="hover:underline px-3 py-1">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:underline px-3 py-1">
            Profile
          </Link>
          <Link
            to="/logout"
            onClick={handleLogout}
            className="hover:bg-white hover:text-blue-600 px-3 py-1 outline rounded-md"
          >
            Logout
          </Link>
        </nav>
      </header>
    );
  }

  return (
    // For unauthenticated users
    <header className="w-full flex justify-between items-center p-5 bg-blue-600 text-white">
      <div className="text-2xl font-bold">ResumeBuilder</div>
      <nav className="flex space-x-4 gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-3 py-1 text-blue-600 rounded-lg"
              : "px-3 py-1 hover:underline"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-3 py-1 text-blue-600 rounded-lg"
              : "px-3 py-1 hover:underline"
          }
        >
          About Us
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-3 py-1 text-blue-600 rounded-lg"
              : "px-3 py-1 hover:underline"
          }
        >
          Contact
        </NavLink>
      </nav>
      <div className="flex space-x-2">
        <Link to="/register">
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-blue-600">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
