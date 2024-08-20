import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("userEmail");
        navigate("/loginData");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <header className="navbar bg-blue-500 text-white fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <p className="flex items-center">
            <img
              src="../img/logo.jpg"
              alt="MYAPP Logo"
              className="h-16 w-auto"
            />
          </p>
          <nav className="hidden md:flex">
            <div className="nav-links flex gap-4">
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
              <Link to="/loginData" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/edit_profile" className="hover:text-gray-300">
                Profile
              </Link>
              <Link to="/intern_listing" className="hover:text-gray-300">
                Interns
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300">
                Log-Out
              </button>
            </div>
          </nav>
        </div>
      </header>
      <div className="pt-20">
        {" "}
        {/* Added `pt-20` class to ensure content starts below the navbar */}
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default Navbar;
