import React, { useState, useRef, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HireMeeTest.css"; // Import your external CSS file

const HireMeeTest = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("hiremeeData"));
    if (savedData) {
      setFormValues(savedData);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle Enter key press to move focus to the next input field
  const handleKeyDown = (e, fieldIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const fieldNames = [
        "Verbal",
        "Quantitative",
        "Logical",
        "Core",
        "Fundamentals",
        "Communication",
        "AffectiveCommunication",
        "Assertiveness",
        "DesireToLead",
        "Trusting",
        "Diversity",
        "SocialRelationship",
        "RelationshipBuilding",
        "TeamSpirit",
        "Recognition",
        "Security",
        "Planning",
        "AchievementOrientation",
        "ProcessOrientation",
        "ServiceOrientation",
        "SystemOrientation",
        "SelfEsteem",
        "SelfConfidence",
        "Empathy",
        "DecisionMaking",
        "Creativity",
        "Innovation",
        "ProblemSolving",
        "Inquisitiveness",
        "Adaptability",
        "Flexibility",
        "Integrity",
        "Dutifulness",
        "Accountability",
      ];

      // Focus the next input field
      const nextField = document.querySelector(
        `input[name=${fieldNames[fieldIndex + 1]}]`
      );

      if (nextField) {
        nextField.focus();
      }
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const fieldNames = [
      "Verbal",
      "Quantitative",
      "Logical",
      "Core",
      "Fundamentals",
      "Communication",
      "AffectiveCommunication",
      "Assertiveness",
      "DesireToLead",
      "Trusting",
      "Diversity",
      "SocialRelationship",
      "RelationshipBuilding",
      "TeamSpirit",
      "Recognition",
      "Security",
      "Planning",
      "AchievementOrientation",
      "ProcessOrientation",
      "ServiceOrientation",
      "SystemOrientation",
      "SelfEsteem",
      "SelfConfidence",
      "Empathy",
      "DecisionMaking",
      "Creativity",
      "Innovation",
      "ProblemSolving",
      "Inquisitiveness",
      "Adaptability",
      "Flexibility",
      "Integrity",
      "Dutifulness",
      "Accountability",
    ];

    // Validate each field
    fieldNames.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = "This field is required";
      } else if (
        isNaN(formValues[field]) ||
        formValues[field] < 0 ||
        formValues[field] > 10
      ) {
        newErrors[field] = "Value must be between 0 and 10";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle Save button click
  const handleSave = () => {
    if (validateForm()) {
      console.log("Save button clicked");
      // Save data locally (for example, in localStorage)
      localStorage.setItem("hiremeeData", JSON.stringify(formValues));
      toast.success("Data saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      setTimeout(() => {
        navigate("/mainPage");
      }, 3000);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // Submit data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/test/hireme",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data submitted successfully:", response.data);

      // Redirect to the results page after successful submission
      toast.success("Data submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/results");
      }, 3000);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Enter Your HIREMEE&#174; Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to the full assessment report generated by{" "}
            <a
              href="https://hiremee.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              HIREMEE&#174;
            </a>
          </p>

          <p className="text-md mb-4 text-center text-red-500">
            If any value is missing in your test report, please enter zero in
            the corresponding field.
          </p>
          <br />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Section 1: Aptitude */}
            <fieldset className="mb-8">
              <legend className="text-xl font-bold mb-4">Aptitude</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Verbal",
                  "Quantitative",
                  "Logical",
                  "Core",
                  "Fundamentals",
                  "Communication",
                ].map((field, index) => (
                  <div className="flex flex-col" key={field}>
                    <label className="mb-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)} :
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      placeholder="Enter value between 0 to 9"
                      className={`p-2 border rounded ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Section 2: Team Work Qualities */}
            <fieldset className="mb-8">
              <legend className="text-xl font-bold mb-4">
                Team Work Qualities
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "AffectiveCommunication",
                  "Assertiveness",
                  "DesireToLead",
                  "Trusting",
                  "Diversity",
                  "SocialRelationship",
                  "RelationshipBuilding",
                  "TeamSpirit",
                  "Recognition",
                  "Security",
                ].map((field, index) => (
                  <div className="flex flex-col" key={field}>
                    <label className="mb-2">
                      {field.replace(/([A-Z])/g, " $1")} :
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, 6 + index)}
                      placeholder="Enter value between 0 to 10"
                      className={`p-2 border rounded ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Section 3: Work Orientation */}
            <fieldset className="mb-8">
              <legend className="text-xl font-bold mb-4">
                Work Orientation
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Planning",
                  "AchievementOrientation",
                  "ProcessOrientation",
                  "ServiceOrientation",
                  "SystemOrientation",
                ].map((field, index) => (
                  <div className="flex flex-col" key={field}>
                    <label className="mb-2">
                      {field.replace(/([A-Z])/g, " $1")} :
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, 16 + index)}
                      placeholder="Enter value between 0 to 10"
                      className={`p-2 border rounded ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Section 4: Soft Skills */}
            <fieldset className="mb-8">
              <legend className="text-xl font-bold mb-4">Soft Skills</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "SelfEsteem",
                  "SelfConfidence",
                  "Empathy",
                  "DecisionMaking",
                  "Creativity",
                  "Innovation",
                  "ProblemSolving",
                  "Inquisitiveness",
                  "Adaptability",
                  "Flexibility",
                  "Integrity",
                  "Dutifulness",
                  "Accountability",
                ].map((field, index) => (
                  <div className="flex flex-col" key={field}>
                    <label className="mb-2">
                      {field.replace(/([A-Z])/g, " $1")} :
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formValues[field] || ""}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, 21 + index)}
                      placeholder="Enter value between 0 to 10"
                      className={`p-2 border rounded ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm">
                        {errors[field]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/emotional-intelligence")}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600 stroke-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-80"
              >
                Submit Values
              </button>
            </div>
          </form>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default HireMeeTest;
