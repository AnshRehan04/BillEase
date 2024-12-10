import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve admin name from local storage
    const name = localStorage.getItem('adminName');
    if (name) setAdminName(name);
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    localStorage.removeItem('adminName'); // Clear admin name
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 h-16 relative">
      <h1 className="text-xl font-bold text-blue-600">AdminDashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle className="text-gray-600 w-8 h-8" />
            <span className="text-gray-800 font-medium">{adminName}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
