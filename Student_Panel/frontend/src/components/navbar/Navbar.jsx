import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './logo.png';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-orange-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="relative flex items-center justify-between h-50"> {/* Increased height */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-40 w-400 " src={logo} alt="PEARL" /> {/* Increased logo size */}
            <h1 className="text-2xl font-bold ml-4"></h1> {/* Increased font size and margin */}
          </div>
          <div className="flex items-center mr-4">
            <button
              className="bg-gray-900 text-white px-5 py-3 rounded-lg text-lg hover:bg-gray-700" 
              onClick={handleLogout} 
            > 
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
