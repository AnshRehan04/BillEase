import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from './firebase'; // Adjust the path if necessary
import { signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    const [accountType, setAccountType] = useState('');
    const [errors, setErrors] = useState({}); // State to track field-specific errors
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const newErrors = {};

        if (!email) {
            newErrors.email = "Please enter your email.";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email address format.";
        }

        if (!pass) {
            newErrors.pass = "Please enter your password.";
        } else if (!passwordRegex.test(pass)) {
            newErrors.pass = "Incorrect Password!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleErrors = (error) => {
        if (error.response) {
            setErrors({ server: error.response.data.message || "Something went wrong." });
        } else if (error.request) {
            setErrors({ server: "Network error: Please try again." });
        } else {
            setErrors({ server: error.message });
        }
    };

    const signIn = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8000/login', {
                email: email.trim().toLowerCase(),
                password: pass.trim(),
                accountType
            });

            if (response.data.success) {
                localStorage.setItem("userInfo", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token)); // Adjust token logic as needed

                if (response.data.dashboard === "admin") {
                    navigate("/admin-dashboard");
                } else if (response.data.dashboard === "user") {
                    navigate("/dashboard");
                }
            } else {
                setErrors({ server: response.data.message });
            }
        } catch (error) {
            handleErrors(error);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            localStorage.setItem("userInfo", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(user.token));
            navigate("/dashboard");
        } catch (error) {
            handleErrors(error);
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async () => {
        if (!email) {
            setErrors({ email: "Please enter your email address." });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setErrors({ server: "Password reset email sent. Please check your inbox." });
        } catch (error) {
            handleErrors(error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#ffffff]">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <div className="flex items-center">
                            <img
                                className="h-16 w-auto"
                                src="https://d30w0v1mttprqz.cloudfront.net/img/features/cloud-pos/stand-pos.svg"
                                alt="Company Logo"
                            />
                        </div>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign in to BillEase</h2>
                    </div>
                    <div className="mt-6 flex space-x-4">
    <button
        onClick={signInWithGoogle}
        disabled={loading}
        className="flex-1 flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
    >
        <span className="sr-only">Sign in with Google</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 488 512">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
        </svg>
    </button>
    {/* <button
        className="flex-1 flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
        disabled={loading}
        aria-label="Sign in with Twitter"
    >
        <span className="sr-only">Sign in with Twitter</span>
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
    </button> */}
    
</div>
<div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                    <div className="mt-8">
                        <form onSubmit={signIn} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <div className="relative mt-1">
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          required
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {errors.pass && <p className="text-red-600 text-sm">{errors.pass}</p>}
    </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Account Type</label>
                                <div className="mt-1 flex space-x-4">
                                    <div>
                                        <input
                                            id="user"
                                            name="accountType"
                                            type="radio"
                                            value="user"
                                            checked={accountType === 'user'}
                                            onChange={() => setAccountType('user')}
                                            className="mr-2"
                                        />
                                        <label htmlFor="user" className="text-sm text-gray-700">User</label>
                                    </div>
                                    <div>
                                        <input
                                            id="admin"
                                            name="accountType"
                                            type="radio"
                                            value="admin"
                                            checked={accountType === 'admin'}
                                            onChange={() => setAccountType('admin')}
                                            className="mr-2"
                                        />
                                        <label htmlFor="admin" className="text-sm text-gray-700">Admin</label>
                                    </div>
                                </div>
                            </div>
                            {errors.server && <p className="text-red-600 text-sm mt-2">{errors.server}</p>}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 flex items-center justify-center">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account?&nbsp;
                                        <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Sign up
                                        </a>
                                    </p>
                                </div>
                        
                        
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fHxlbnwwfHx8fDE2MzkwOTAxMzA&ixlib=rb-1.2.1&q=85&w=1920"
                        alt=""
                    />
                </div>
        </div>
    );
}