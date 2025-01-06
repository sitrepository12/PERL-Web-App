import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import safflogologo from "./safflogo.png";
import Form from "../form/Form";
import Login from "../login/Login";
import safflogo from "./safflogo.png";
import "./First_Page.css"


function First_Page() {
  const navigate = useNavigate();

  const goToFormPage = () => {
    navigate("/form");
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden max-w-500">
      {/* Navbar */}

      {/* Main content */}
      <div className="flex-1 flex justify-center p-2  bg-gray-50 relative z-10">
        <div className="w-full max-w-xl  p-10 bg-white rounded-lg shadow-md relative">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center">
              <img
                src={logo}
                alt="S.P.B. Patel Engineering College"
                className="mx-10 mb-0"
                style={{ height: '250px', width: 'auto', maxHeight: '700px', maxWidth: '700px' }}
              />
            </div>

             <h1 className="text-2xl font-bold text-center">Welcome To 
            {/* <span style={{
                fontSize: "5rem", // Adjust font size as needed
                fontWeight: "bold", // Bold font weight
                textAlign: "center", // Center align text
                color: "black", // Dark Orange color
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // 3D shadow effect
              }}>PEARL</span> */}
              </h1>


            <h2
              style={{
                fontSize: "5rem", // Adjust font size as needed
                fontWeight: "bold", // Bold font weight
                textAlign: "center", // Center align text
                color: "black", // Dark Orange color
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // 3D shadow effect
              }}
            >
              PEARL
            </h2>

            <p className="text-xl text-center mb-8">
              Personality & Employability Assessment Records Logger
            </p>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <button
                className="bg-black text-white rounded-md py-2 px-5 hover:bg-gray-700 transition-colors duration-300"
                onClick={goToLoginPage}
              >
                Sign In
              </button>
              <button
                className="bg-white text-black border-2 border-black rounded-md py-2 px-5 hover:bg-black hover:text-white transition-colors duration-300"
                onClick={goToFormPage}
              >
                Create account
              </button>
            </div>

            {/* Logo at bottom */}
            <div className="flex justify-center mt-10 ">
              <img
                src={safflogo}
                alt="S.P.B. Patel Engineering College"
                className="h-20 mb-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black text-white py-6 mt-14">
  <div className="container mx-auto flex flex-col items-center">
    <h1 className="text-lg font-semibold mb-2">Designed By:</h1>
    <div className="flex flex-wrap justify-center items-center space-x-4">
      <a
        href="https://www.linkedin.com/in/krupa-patel-801332250/"
        className="text-md link-hover" target="_blank"
      >
        Krupa Patel
      </a>
      <a
        href="https://www.linkedin.com/in/sneha-patel-69ba71241/"
        className="text-md link-hover" target="_blank"
      >
        Sneha Patel
      </a>
      <a
        href="https://www.linkedin.com/in/umesh-choudhary-67980a242/"
        className="text-md link-hover" target="_blank"
      >
        Umesh Choudhary
      </a>
      <a
        href="https://www.linkedin.com/in/karmvir-jadeja-a21374201/"
        className="text-md link-hover" target="_blank"
      >
        Karmvir Jadeja
      </a>
      <a
        href="https://www.linkedin.com/in/aditya-gupta-a18a4025a/"
        className="text-md link-hover" target="_blank"
      >
        Aditya Gupta
      </a>
    </div>
    <div className="mt-4">
      <p className="text-sm">&copy; 2024 PEARL. All rights reserved.</p>
    </div>
  </div>
</footer>

      {/* Define routes for Form and Login */}
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default First_Page;
