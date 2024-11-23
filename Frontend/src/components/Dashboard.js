import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios'; // Import axios for HTTP requests
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

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Dashboard() {
  const [customerData, setCustomerData] = useState([]); // State to store customer data
  
  // Fetch customer data on component mount
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/customers'); // Replace with your server's URL
        setCustomerData(response.data); // Update state with fetched customer data
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  // Data for the bar chart (last 6 months revenue)
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [5000, 7000, 8000, 6000, 9000, 11000], // Example revenue data
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Revenue (Last 6 Months)',
      },
    },
  };

  // Data for the line chart (last 1 year revenue)
  const lineChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Revenue (Last 1 Year)',
        data: [4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000], // Example yearly data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Smoothing for the line
        pointRadius: 5, // Points on the line
      },
    ],
  };

  // Options for the line chart
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue (Last 1 Year)',
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the Y-axis from zero
      },
    },
  };

  return (
    <div>
      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[{ title: 'USERS', value: 232, link: 'See all users' }, 
          { title: 'ORDERS', value: 34, link: 'View all orders' }, 
          { title: 'PRODUCTS', value: 107, link: 'See all products' }, 
          { title: 'BALANCE', value: '$444', link: 'See all details' }]
          .map((card, index) => (
            <div key={index} className="p-6 bg-white shadow rounded-md flex flex-col items-start">
              <h2 className="text-gray-600">{card.title}</h2>
              <h1 className="text-2xl font-bold mt-2">{card.value}</h1>
              <a href="#" className="text-blue-500 mt-4">{card.link}</a>
            </div>
        ))}
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
