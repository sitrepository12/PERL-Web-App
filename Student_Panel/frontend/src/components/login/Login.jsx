import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link} from "react-router-dom";
import logo from "./logo.png";
import safflogo from "./safflogo.png";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpError, setShowOtpError] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

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
        let response;
        if (otpSent) {
          response = await axios.post(
            "http://localhost:3000/api/auth/verify-otp",
            { email, otp },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await axios.post(
            "http://localhost:3000/api/auth/login",
            { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.message === "OTP sent successfully") {
            setOtpSent(true);
            toast.success("OTP sent successfully", toastOptions);
          } else {
            const { token } = response.data;
            localStorage.setItem("token", token);
            toast.success("Login successful!", toastOptions);
            setTimeout(() => {
              navigate("/MainPage");
            }, 3000); // Delay navigation by 3 seconds
          }
        }

        const { token } = response.data;
        localStorage.setItem("token", token);
        toast.success("OTP confirmed and login successful!", toastOptions);
        setTimeout(() => {
          navigate("/MainPage");
        }, 3000); // Delay navigation by 3 seconds
      } catch (error) {
        console.error("Error logging in:", error);
        toast.error("Invalid email or password. Please try again.", toastOptions);
        setShowOtpError(true);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Navigate to Forgot Password page
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <ToastContainer {...toastOptions} />
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
              disabled={otpSent}
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
              disabled={otpSent}
            />
            {errors.password && (
              <p className="w-full mb-4 text-sm text-red-600">
                {errors.password}
              </p>
            )}

            {otpSent && (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-3 px-4 mb-1 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
                {showOtpError && (
                  <p className="w-full mb-2 text-sm text-red-600">
                    Incorrect OTP. Please try again.
                  </p>
                )}
                <button
                  onClick={handleLogin}
                  className="w-full py-3 px-6 text-xl font-medium text-white bg-gray-800 hover:bg-gray-900 rounded"
                >
                  Confirm OTP
                </button>
              </>
            )}

            {!otpSent && (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full py-3 px-6 mb-6 text-xl font-medium text-white bg-gray-800 hover:bg-gray-900 rounded"
                >
                  Login
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="w-full py-3 px-6 text-lg text-orange-400 hover:text-orange-600 focus:outline-none"
                >
                  Forgot Password?
                </button>
              </>
            )}

            <p className="mt-4">
              Don't have an account?{" "}
              <Link to="/form"
                className="text-orange-600 hover:text-orange-700 hover:underline"

              >

                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
