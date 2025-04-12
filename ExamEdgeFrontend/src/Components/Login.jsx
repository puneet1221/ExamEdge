import React, { useState } from "react";
import axios, { HttpStatusCode } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext/AppContext";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { setLoginState, setUserDetails } = useAppContext();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Both fields are required");
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.post("http://localhost:8080/user/login", {
        username: email,
        password: password,
      });

      if (response.status === HttpStatusCode.Accepted && response.data) {
        
       
        setUserDetails(response.data); // Set user details
        setLoginState(true); // Update login state
        setErrorMessage(""); // Clear any previous errors
        navigate("/"); // Redirect to home
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
        setUser({ email: "", password: "" }); // Reset user inputs
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Server error. Please try again later."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all ease-in-out duration-300"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all ease-in-out duration-300"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 ${
                loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600"
              } text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all ease-in-out duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Forgot your password?{" "}
              <Link to="/resetPassword" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Reset it here
              </Link>
            </p>
          </div>

          {/* Don't have an account link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
