// Components/navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  return (
    <nav className="bg-red-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-2">
        {/* <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-red-600 font-bold text-lg">B</span>
        </div> */}
        <h1 className="text-2xl font-bold">Blood Donation</h1>
      </div>

      <div className="space-x-6">
        {!isAuthenticated ? (
          <>
            <Link 
              to="/" 
              className="hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 font-medium"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link 
              to="/dashboard" 
              className="hover:bg-red-700 px-4 py-2 rounded-lg transition duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;