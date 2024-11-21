import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function OtpVerify() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleOtpVerify = async () => {
        try {
            const email = JSON.parse(localStorage.getItem("userInfo")).email; // Retrieve email
            console.log("Email:", email);  // Log email
            console.log("OTP:", otp);      // Log OTP
            const response = await axios.post("http://localhost:8000/verify-otp", { email, otp });
            if (response.data.success) {
                toast.success("OTP verified!");
                navigate("/dashboard"); // Navigate to the dashboard on success
            } else {
                toast.error("Invalid or expired OTP.");
            }
        } catch (error) {
            toast.error("Failed to verify OTP. Please try again.");
        }
    };
    

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="mb-4 text-xl font-bold">Verify OTP</h2>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="mb-4 w-64 px-4 py-2 border rounded"
                />
                <button
                    onClick={handleOtpVerify}
                    className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Verify OTP
                </button>
            </div>
        </>
    );
}
