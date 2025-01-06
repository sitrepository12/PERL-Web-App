import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OceanTest = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("oceanData"));
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
      "Openness",
      "Conscientiousness",
      "Extraversion",
      "Agreeableness",
      "NaturalReactions",
    ];

    fields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = "This field is required";
      } else if (
        isNaN(formValues[field]) ||
        formValues[field] < 0 ||
        formValues[field] > 100
      ) {
        newErrors[field] = "Value must be between 0 and 100";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save button click
  const handleSave = () => {
    if (validateForm()) {
      console.log("Save button clicked");
      // Save data locally (for example, in localStorage)
      localStorage.setItem("oceanData", JSON.stringify(formValues));
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
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (validateForm()) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/test/ocean",
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
          navigate("/riasec");
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
            Enter Your OCEAN Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to your{" "}
            <a
              href="https://www.123test.com/personality-test/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              OCEAN
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
                <label className="mb-2">Openness :</label>
                <input
                  type="text"
                  name="Openness"
                  value={formValues.Openness || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 100"
                  className={`p-2 border rounded ${
                    errors.Openness ? "border-red-500" : ""
                  }`}
                />
                {errors.Openness && (
                  <span className="text-red-500 text-sm">
                    {errors.Openness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Conscientiousness :</label>
                <input
                  type="text"
                  name="Conscientiousness"
                  value={formValues.Conscientiousness || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 100"
                  className={`p-2 border rounded ${
                    errors.Conscientiousness ? "border-red-500" : ""
                  }`}
                />
                {errors.Conscientiousness && (
                  <span className="text-red-500 text-sm">
                    {errors.Conscientiousness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Extraversion :</label>
                <input
                  type="text"
                  name="Extraversion"
                  value={formValues.Extraversion || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 100"
                  className={`p-2 border rounded ${
                    errors.Extraversion ? "border-red-500" : ""
                  }`}
                />
                {errors.Extraversion && (
                  <span className="text-red-500 text-sm">
                    {errors.Extraversion}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Agreeableness :</label>
                <input
                  type="text"
                  name="Agreeableness"
                  value={formValues.Agreeableness || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 100"
                  className={`p-2 border rounded ${
                    errors.Agreeableness ? "border-red-500" : ""
                  }`}
                />
                {errors.Agreeableness && (
                  <span className="text-red-500 text-sm">
                    {errors.Agreeableness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Natural Reactions :</label>
                <input
                  type="text"
                  name="NaturalReactions"
                  value={formValues.NaturalReactions || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter value between 0 to 100"
                  className={`p-2 border rounded ${
                    errors.NaturalReactions ? "border-red-500" : ""
                  }`}
                />
                {errors.NaturalReactions && (
                  <span className="text-red-500 text-sm">
                    {errors.NaturalReactions}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/disc")}
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

export default OceanTest;
