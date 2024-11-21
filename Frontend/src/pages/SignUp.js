import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Regex patterns
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUp() {
  const [role, setRole] = useState(""); // Initially empty
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword || !name) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (!nameRegex.test(name)) {
      toast.error("Name cannot include numbers.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character."
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (!role) {
      toast.error("Please select a role.");
      return false;
    }
    return true;
  };

  const handleErrors = (error) => {
    console.error("Error occurred:", error);

    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.statusText ||
        "Unknown server error";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("Network error: Please try again.");
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Post data to your backend server
      const response = await axios.post("http://localhost:8000/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        role,
      });

      console.log(response.data);

      toast.success("Sign-Up successful! You can now log in.");
      navigate("/");
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#ffffff]">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="flex items-center">
                <img
                  className="h-16 w-auto"
                  src="https://d30w0v1mttprqz.cloudfront.net/img/features/cloud-pos/stand-pos.svg"
                  alt="Company Logo"
                  aria-label="Company Logo"
                />
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Sign up for BillEase
              </h2>
            </div>

            <div className="mt-8">
              <form onSubmit={signUp} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    aria-label="Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    aria-label="Email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    aria-label="Password"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    aria-label="Confirm Password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="role-user"
                        name="role"
                        type="radio"
                        value="user"
                        checked={role === "user"}
                        onChange={() => setRole("user")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="role-user"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        User
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="role-admin"
                        name="role"
                        type="radio"
                        value="admin"
                        checked={role === "admin"}
                        onChange={() => setRole("admin")}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="role-admin"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Admin
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Sign up with email"
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center">
                <p className="text-sm text-gray-600">
                  Already have an account?&nbsp;
                  <a
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
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
            alt="Background"
          />
        </div>
      </div>
    </>
  );
}
