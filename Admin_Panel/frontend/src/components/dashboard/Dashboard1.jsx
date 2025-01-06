import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../navbar/Navbar";

const Dashboard1 = () => {
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [startYear, setStartYear] = useState(null);
  const [errors, setErrors] = useState({});

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
    if (errors.branch) {
      setErrors((prevErrors) => ({ ...prevErrors, branch: null }));
    }
  };

  const handleStartYearChange = (date) => {
    setStartYear(date);
    if (errors.startYear) {
      setErrors((prevErrors) => ({ ...prevErrors, startYear: null }));
    }
  };

  const handleViewData = () => {
    let newErrors = {};

    if (!branch) {
      newErrors.branch = "Branch is required";
    }

    if (!startYear) {
      newErrors.startYear = "Graduation year is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const batch = startYear.getFullYear(); // Batch year is same as the graduation year
      console.log(`Branch: ${branch}, Batch Year: ${batch}`);
      // Redirect to Datapage with state
      navigate("/datapage", {
        state: { branch, batch },
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow py-8 bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-4 md:mx-0">
          <div className="mb-4">
            <label
              htmlFor="branch"
              className="block text-lg mb-2 text-gray-800"
            >
              Select Branch
            </label>
            <select
              id="branch"
              value={branch}
              onChange={handleBranchChange}
              className={`w-full px-4 py-2 border ${
                errors.branch ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            >
              <option value="">Select Branch</option>
              <option value="All">All</option>
              <option value="CE">Computer Engineering</option>
              <option value="IT">Information Technology</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CL">Civil Engineering</option>
            </select>
            {errors.branch && (
              <p className="text-sm text-red-500 mt-1">{errors.branch}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="startYear"
              className="block text-lg mb-2 text-gray-800"
            >
              Select Graduation Year
            </label>
            <DatePicker
              selected={startYear}
              onChange={handleStartYearChange}
              showYearPicker
              dateFormat="yyyy"
              className={`w-full px-4 py-2 border ${
                errors.startYear ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholderText="Graduation year"
            />
            {errors.startYear && (
              <p className="text-sm text-red-500 mt-1">{errors.startYear}</p>
            )}
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded mt-8 w-full sm:w-auto"
            onClick={handleViewData}
          >
            View Data
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard1;
