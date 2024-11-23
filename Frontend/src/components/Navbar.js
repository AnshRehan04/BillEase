import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importing a profile icon

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (e.g., tokens, etc.)
    localStorage.removeItem('authToken'); // Adjust key as per your app
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 h-16">
      <h1 className="text-xl font-bold text-blue-600">AdminDashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex items-center space-x-2">
          {/* Replace Admin text with profile icon */}
          <FaUserCircle
            className="text-gray-600 w-8 h-8 cursor-pointer"
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
