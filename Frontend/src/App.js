import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'; // User Dashboard
import AdminDashboard from './Admin Pannel/AdminDashboard'; // Admin Dashboard
import Orders from './pages/Orders';
import Customer from "./pages/Customer";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
// import OtpVerify from './pages/OtpVerify'; // OTP Verification Component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path="/verify-otp" element={<OtpVerify />} /> */}

          {/* User Routes */}
          <Route path='/dashboard' element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customer" element={<Customer />} />

          {/* Admin Route */}
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;