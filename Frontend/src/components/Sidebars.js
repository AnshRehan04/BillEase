import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="bg-blue-600 text-white w-64 p-6 space-y-6">
      <h1 className="text-2xl font-bold">Main</h1>
      <nav className="space-y-4">
        <Link to="/admin-dashboard" className="block hover:text-gray-200">
          Dashboard
        </Link>
        <Link to="/products" className="block hover:text-gray-200">
          Products
        </Link>
        <Link to="/orders" className="block hover:text-gray-200">
          Orders
        </Link>
        <Link to="/balance" className="block hover:text-gray-200">
          Balance
        </Link>
        <Link to="/status" className="block hover:text-gray-200">
          Status
        </Link>
      </nav>
      <h1 className="text-2xl font-bold">Settings</h1>
      <nav className="space-y-4">
        <Link to="/profile" className="block hover:text-gray-200">
          Profile
        </Link>
        <Link to="/settings" className="block hover:text-gray-200">
          Settings
        </Link>
        <Link to="/logout" className="block hover:text-gray-200">
          Log Out
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
