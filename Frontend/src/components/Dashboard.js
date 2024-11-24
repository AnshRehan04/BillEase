import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Dashboard() {
  const [customerData, setCustomerData] = useState([]);
  const [userCount, setUserCount] = useState(0); // State to store the count of users

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await axios.get('http://localhost:8000/api/customers');
        setCustomerData(customerResponse.data);

        // Fetch user count
        const userCountResponse = await axios.get('http://localhost:8000/api/users/count');
        setUserCount(userCountResponse.data.count);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [5000, 7000, 8000, 6000, 9000, 11000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Total Revenue (Last 6 Months)' },
    },
  };

  const lineChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Revenue (Last 1 Year)',
        data: [4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue (Last 1 Year)' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-6 bg-white shadow rounded-md flex flex-col items-start">
          <h2 className="text-gray-600">USERS</h2>
          <h1 className="text-2xl font-bold mt-2">{userCount}</h1>
          <a href="#" className="text-blue-500 mt-4">See all users</a>
        </div>
        {/* Other cards */}
      </div>

      {/* Customer Data */}
      <div className="p-6 bg-white shadow rounded-md mb-6">
        <h2 className="text-gray-600 mb-4">Customer Details</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Table</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length > 0 ? (
              customerData.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-4 py-2 border">{customer.name}</td>
                  <td className="px-4 py-2 border">{customer.email}</td>
                  <td className="px-4 py-2 border">{customer.phone}</td>
                  <td className="px-4 py-2 border">{customer.tableNum}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-2">No customers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-gray-600 mb-4">Total Revenue</h2>
          <div className="h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        <div className="p-6 bg-white shadow rounded-md">
          <h2 className="text-gray-600 mb-4">Revenue (Last 1 Year)</h2>
          <div className="h-64">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
