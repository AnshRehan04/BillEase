import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home'; // User Dashboard
import Orders from './pages/Orders'; // Orders Page
import Customer from "./pages/Customer"; // Customer Page
import Login from './pages/Login'; // Login Page
import SignUp from './pages/SignUp'; // Sign-Up Page
import Navbar from './components/Navbar'; // Admin Navbar
import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard Component
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {/* Conditional Navbar */}
        <ConditionalNavbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <Home />
            </ProtectedRoute>
            } />
          <Route path="/orders" element={
            <ProtectedRoute>
            <Orders />
            </ProtectedRoute>
            } />
          <Route path="/customer" element={
            <ProtectedRoute>
            <Customer />
            </ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
              </ProtectedRoute>
              
              
            } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Function to conditionally render the Navbar
function ConditionalNavbar() {
  const location = useLocation();

  // Define admin-related routes (add or adjust routes as necessary)
  const adminRoutes = ['/admin-dashboard', '/admin-home']; // Add any other admin routes here

  // Show Navbar only on admin routes
  return adminRoutes.some(route => location.pathname.startsWith(route)) ? <Navbar /> : null;
}

export default App;
