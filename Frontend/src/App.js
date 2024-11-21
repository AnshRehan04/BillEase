import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from './pages/Orders';
import Customer from "./pages/Customer";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OtpVerify from './pages/OtpVerify'; // Import the OTP verification component

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customer" element={<Customer />} />
          {/* <Route path="/verify-otp" element={<OtpVerify />} /> Add OTP verification route */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
