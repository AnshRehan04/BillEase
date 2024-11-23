import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

function AdminDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}

        {/* Main Dashboard */}
        <div className="flex-1 p-6 bg-gray-100">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
