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
        backgroundColor: '#4F46E5',
        borderColor: '#4F46E5',
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
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
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
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Users', value: userCount, color: 'bg-blue-500' },
          { title: 'Orders', value: customerData.length, color: 'bg-green-500' }, // Use customerData.length for Orders
          { title: 'Balance', value: '₹20000', color: 'bg-yellow-500' },
        ].map((card, index) => (
          <div
            key={index}
            className={`p-6 ${card.color} text-white rounded-xl shadow-lg flex flex-col justify-between`}
          >
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <h1 className="text-3xl font-bold mt-4">{card.value}</h1>
          </div>
        ))}
      </div>

      {/* Customer Data */}
      <div className="p-6 bg-white shadow-lg rounded-xl mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Customer Details</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-gray-600 font-medium border">Name</th>
              <th className="px-4 py-3 text-gray-600 font-medium border">Email</th>
              <th className="px-4 py-3 text-gray-600 font-medium border">Phone</th>
              <th className="px-4 py-3 text-gray-600 font-medium border">Table</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length > 0 ? (
              customerData.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{customer.name}</td>
                  <td className="px-4 py-3 border">{customer.email}</td>
                  <td className="px-4 py-3 border">{customer.phone}</td>
                  <td className="px-4 py-3 border">{customer.tableNum}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-4 py-3 text-gray-500">
                  No customers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Total Revenue</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Revenue (Last 1 Year)</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
