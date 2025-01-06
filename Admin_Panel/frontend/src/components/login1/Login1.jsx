import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import safflogo from "./safflogo.png";

const Login1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    const errors = {};
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (password === "") {
      errors.password = "Please enter your password.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/counselors/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { token } = response.data;
        localStorage.setItem("token", token);
        alert("Login successful!");
        navigate("/dashboard1"); // Use navigate instead of history.push
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Invalid email or password. Please try again.");
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to Forgot Password page
  };

 

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-xl p-10 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center mb-5">
              <img
                src={safflogo}
                alt="S.P.B. Patel Engineering College"
                className="h-20 mx-5"
              />
              <img
                src={logo}
                alt="S.P.B. Patel Engineering College"
                className="h-36 mx-5"
              />
            </div>
            <h1 className="text-4xl font-bold text-center mb-4">
              Welcome to PEARL
            </h1>
            <p className="text-xl text-center mb-8">
              Personality & Employability Assessment Records Logger
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 mb-1 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.email && (
              <p className="w-full mb-4 text-sm text-red-600">{errors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 mb-1 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            {errors.password && (
              <p className="w-full mb-4 text-sm text-red-600">
                {errors.password}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 px-6 mb-6 text-xl font-medium text-white bg-gray-800 hover:bg-gray-900 rounded"
            >
              Login
            </button>
            <button
              onClick={handleForgotPassword}
              className="w-full py-3 px-6 text-lg text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Forgot Password?
            </button>


            <p className="mt-4">
              Don't have an account?{" "}
              <a href="/form1"
                className="text-orange-600"

              >
                Create Account
              </a>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;
