import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RiasecTest = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("riasecData"));
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

  // Handle Enter key press to focus the next input field
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
      e.preventDefault();
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    const fields = [
      "Realistic",
      "Investigative",
      "Artistic",
      "Social",
      "Enterprising",
      "Conventional",
    ];

    // Validate each field
    fields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = "This field is required";
      } else if (
        isNaN(formValues[field]) ||
        formValues[field] < 0 ||
        formValues[field] > 60
      ) {
        newErrors[field] = "Value must be a number between 0 and 60";
      }
    });

    // Validate the sum of all values
    const sum = fields.reduce(
      (acc, field) => acc + (parseInt(formValues[field]) || 0),
      0
    );
    if (sum !== 100) {
      newErrors.sum = "Sum of all values must be 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save button click
  const handleSave = () => {
    if (validateForm()) {
      console.log("Save button clicked");
      // Save data locally (for example, in localStorage)
      localStorage.setItem("riasecData", JSON.stringify(formValues));
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/test/riasec",
          formValues,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data submitted successfully:", response.data);
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
          navigate("/emotional-intelligence");
        }, 3000);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Enter Your RIASEC Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to your{" "}
            <a
              href="https://www.123test.com/career-test/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              RIASEC
            </a>{" "}
            report to enter the values for the different parameters as given
            below.
          </p>
          <p className="text-md mb-4 text-center text-red-500">
            If any value is missing in your test report, please enter zero in
            the corresponding field.
          </p>
          <br />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2">Realistic :</label>
                <input
                  type="text"
                  name="Realistic"
                  value={formValues.Realistic || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Realistic ? "border-red-500" : ""
                  }`}
                />
                {errors.Realistic && (
                  <span className="text-red-500 text-sm">
                    {errors.Realistic}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Investigative :</label>
                <input
                  type="text"
                  name="Investigative"
                  value={formValues.Investigative || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Investigative ? "border-red-500" : ""
                  }`}
                />
                {errors.Investigative && (
                  <span className="text-red-500 text-sm">
                    {errors.Investigative}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Artistic :</label>
                <input
                  type="text"
                  name="Artistic"
                  value={formValues.Artistic || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Artistic ? "border-red-500" : ""
                  }`}
                />
                {errors.Artistic && (
                  <span className="text-red-500 text-sm">
                    {errors.Artistic}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Social :</label>
                <input
                  type="text"
                  name="Social"
                  value={formValues.Social || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Social ? "border-red-500" : ""
                  }`}
                />
                {errors.Social && (
                  <span className="text-red-500 text-sm">{errors.Social}</span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Enterprising :</label>
                <input
                  type="text"
                  name="Enterprising"
                  value={formValues.Enterprising || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Enterprising ? "border-red-500" : ""
                  }`}
                />
                {errors.Enterprising && (
                  <span className="text-red-500 text-sm">
                    {errors.Enterprising}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Conventional :</label>
                <input
                  type="text"
                  name="Conventional"
                  value={formValues.Conventional || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 60"
                  className={`p-2 border rounded ${
                    errors.Conventional ? "border-red-500" : ""
                  }`}
                />
                {errors.Conventional && (
                  <span className="text-red-500 text-sm">
                    {errors.Conventional}
                  </span>
                )}
              </div>
            </div>
            {errors.sum && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {errors.sum}
              </div>
            )}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/ocean")}
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
      <ToastContainer />
    </div>
  );
};

export default RiasecTest;
