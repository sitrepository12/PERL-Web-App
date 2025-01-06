import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.png";
import safflogo from "./safflogo.png";

function Form1() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleKeyDown = (e, ref) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ref.current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const userData = {
      firstName,
      middleName,
      lastName,
      email,
      password,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/counselors/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Form submitted with data:", userData);
      console.log("Server response:", response.data);

      navigate("/dashboard1");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-xl p-10 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between mb-5">
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
            </div>
            <h2 className="text-4xl font-bold text-center mb-5">
              Create your account
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <input
                  type="text"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, middleNameRef)}
                  ref={firstNameRef}
                  required
                />

                {/* Middle Name */}
                <input
                  type="text"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
                  ref={middleNameRef}
                />

                {/* Last Name */}
                <input
                  type="text"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  ref={lastNameRef}
                  required
                />

                {/* Email */}
                <input
                  type="email"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                  ref={emailRef}
                  required
                />

                {/* Password */}
                <input
                  type="password"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
                  ref={passwordRef}
                  required
                />

                {/* Confirm Password */}
                <input
                  type="password"
                  className="w-full p-3 border rounded-md outline-none focus:border-black"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  ref={confirmPasswordRef}
                  required
                />
              </div>
              <div className="flex flex-col items-center mt-6">
                <button
                  type="submit"
                  className="w-full p-4 text-lg text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300"
                >
                  Create account
                </button>
                <p className="mt-4">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-orange-600"
                    onClick={handleLoginClick}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form1;
