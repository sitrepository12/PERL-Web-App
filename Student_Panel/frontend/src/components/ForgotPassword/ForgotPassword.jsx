import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "./logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setEmailError(true);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/auth/password/forgot`, { email });
      console.log("OTP sent:", response.data);
      setOtpSent(true);
      setStep(2);
      setEmailError(false);
    } catch (error) {
      console.error("OTP request failed:", error);
      setEmailError(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setOtpError(true);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/auth/password/verify-otp`, { email, otp });
      console.log("OTP verified:", response.data);
      setOtpError(false);
      setStep(3);
    } catch (error) {
      console.error("OTP verification failed:", error);
      setOtpError(true);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/auth/password/reset`, {
        email,
        newPassword,
        confirmPassword,
      });
      console.log("Password updated:", response.data);
      alert("Password updated successfully. Please login with your new password.");
      toast.success("Password updated successfully. Please login with your new password.");
      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Password reset failed. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false); // Reset error state when user starts typing again
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setOtpError(false); // Reset error state when user starts typing again
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
      <div className="mx-auto max-w-md mt-20 mb-20">
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="flex flex-row items-center justify-center mb-5">
            
              <img
                src={logo}
                alt="S.P.B. Patel Engineering College"
                className="h-12 mx-5"
              />
              </div>
              <h1 className="block text-2xl font-bold text-gray-800">
                {step === 1 ? "Forgot password?" : step === 2 ? "Enter OTP" : "Reset Password"}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {step === 1
                  ? "Don't worry we'll send you reset instructions."
                  : step === 2
                  ? "Enter the OTP sent to your email."
                  : "Enter your new password and confirm to reset."}
              </p>
            </div>

            <div className="mt-6">
              {/* Form */}
              {step === 1 ? (
                <form onSubmit={handleEmailSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm text-gray-600">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleEmailChange}
                          className={`peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 
                            ${
                            emailError ? "ring-2 ring-red-500" : ""
                          }`
                        }
                          placeholder=" "
                          required
                          aria-describedby="email-error"
                        />
                        {emailError && (
                          <div className="pointer-events-none absolute top-3 right-0 flex items-center px-3">
                            <svg
                              className="h-5 w-5 text-rose-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        )}
                        {emailError && (
                          <p className="mt-2 text-xs text-rose-600">
                            Valid email address required for the account recovery process
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-800 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Send OTP
                    </button>
                  </div>
                </form>
              ) : step === 2 ? (
                <form onSubmit={handleOtpSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="otp" className="mb-2 block text-sm text-gray-600">
                        OTP
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="otp"
                          name="otp"
                          value={otp}
                          onChange={handleOtpChange}
                          className={`peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500 ${
                            otpError ? "ring-2 ring-red-500" : ""
                          }`}
                          placeholder="Enter the OTP"
                          maxLength={6}
                          required
                          aria-describedby="otp-error"
                        />
                        {otpError && (
                          <div className="pointer-events-none absolute top-3 right-0 flex items-center px-3">
                            <svg
                              className="h-5 w-5 text-rose-500"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                          </div>
                        )}
                        {otpError && (
                          <p className="mt-2 text-xs text-rose-600">
                            Please enter the 6-digit OTP sent to your email.
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="newPassword" className="mb-2 block text-sm text-gray-600">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="mb-2 block text-sm text-gray-600">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <p className="mt-2 flex items-center justify-center divide-x divide-gray-300 text-center mb-7">
          <span className="inline pr-3 text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="whitespace-nowrap font-semibold text-orange-600 hover:underline"
            >
              Log in
            </Link>
          </span>
      
        </p>
        </div>
     
      </div>
  );
};

export default ForgotPassword;
