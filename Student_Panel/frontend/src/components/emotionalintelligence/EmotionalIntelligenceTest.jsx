import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmotionalIntelligenceTest = () => {
  const navigate = useNavigate();
  const [selfAwareness, setSelfAwareness] = useState("");
  const [selfManagement, setSelfManagement] = useState("");
  const [socialAwareness, setSocialAwareness] = useState("");
  const [relationshipManagement, setRelationshipManagement] = useState("");
  const [errors, setErrors] = useState({
    selfAwareness: "",
    selfManagement: "",
    socialAwareness: "",
    relationshipManagement: "",
  });

  useEffect(() => {
    // Load data from localStorage
    const savedData = JSON.parse(
      localStorage.getItem("emotionalIntelligenceData")
    );
    if (savedData) {
      setSelfAwareness(savedData.selfAwareness);
      setSelfManagement(savedData.selfManagement);
      setSocialAwareness(savedData.socialAwareness);
      setRelationshipManagement(savedData.relationshipManagement);
    }
  }, []);

  const handleSave = () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrors(validationError);
      
      return;
    }

    // Save data locally (for example, in localStorage)
    const emotionalIntelligenceData = {
      selfAwareness: selfAwareness,
      selfManagement: selfManagement,
      socialAwareness: socialAwareness,
      relationshipManagement: relationshipManagement,
    };
    localStorage.setItem(
      "emotionalIntelligenceData",
      JSON.stringify(emotionalIntelligenceData)
    );

    // Redirect to the main page
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    // Prepare data to be submitted to the backend
    const emotionalIntelligenceData = {
      selfAwareness: selfAwareness,
      selfManagement: selfManagement,
      socialAwareness: socialAwareness,
      relationshipManagement: relationshipManagement,
    };

    try {
      const token = localStorage.getItem("token");
      // Submit data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/test/emotionalintelligence",
        emotionalIntelligenceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data submitted successfully:", response.data);

      // Redirect to the main page after successful submission
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
        navigate("/hiremee");
      }, 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error appropriately
    }
  };

  const validateInputs = () => {
    const newErrors = {
      selfAwareness: "",
      selfManagement: "",
      socialAwareness: "",
      relationshipManagement: "",
    };

    // Check if any field is empty or value is not between 0-10
    if (!isValidInput(selfAwareness)) {
      newErrors.selfAwareness = "Please enter a value between 0 and 10";
    }
    if (!isValidInput(selfManagement)) {
      newErrors.selfManagement = "Please enter a value between 0 and 10";
    }
    if (!isValidInput(socialAwareness)) {
      newErrors.socialAwareness = "Please enter a value between 0 and 10";
    }
    if (!isValidInput(relationshipManagement)) {
      newErrors.relationshipManagement =
        "Please enter a value between 0 and 10";
    }

    // Return null if no errors, else return newErrors object
    return Object.values(newErrors).some((error) => error !== "")
      ? newErrors
      : null;
  };

  const isValidInput = (value) => {
    const intValue = parseInt(value);
    return !isNaN(intValue) && intValue >= 0 && intValue <= 10;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Enter Your Emotional Intelligence Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to your{" "}
            <a
              href="https://globalleadershipfoundation.com/geit/eitest.html#:~:text=The%20Global%20E
motional%20Intelligence%20Test,Intelligence%20Competency%20Model%20(2002)."
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Emotional Intelligence
            </a>{" "}
            report to enter the values for the different parameters as given
            below.
            <br />
            <br />
            <p className="text-md mb-4 text-center text-red-500">
              If any value is missing in your test report, please enter zero in
              the corresponding field.
            </p>
            <br />
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2">Self Awareness :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.selfAwareness ? "border-red-500" : ""
                  }`}
                  value={selfAwareness}
                  onChange={(e) => {
                    setSelfAwareness(e.target.value);
                    setErrors({ ...errors, selfAwareness: "" });
                  }}
                  placeholder="Enter value between 0 to 10"
                  required
                  min="0"
                  max="10"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.selfAwareness && (
                  <span className="text-red-500 text-sm">
                    {errors.selfAwareness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Self Management :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.selfManagement ? "border-red-500" : ""
                  }`}
                  value={selfManagement}
                  onChange={(e) => {
                    setSelfManagement(e.target.value);
                    setErrors({ ...errors, selfManagement: "" });
                  }}
                  placeholder="Enter value between 0 to 10"
                  required
                  min="0"
                  max="10"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.selfManagement && (
                  <span className="text-red-500 text-sm">
                    {errors.selfManagement}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Social Awareness :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.socialAwareness ? "border-red-500" : ""
                  }`}
                  value={socialAwareness}
                  onChange={(e) => {
                    setSocialAwareness(e.target.value);
                    setErrors({ ...errors, socialAwareness: "" });
                  }}
                  placeholder="Enter value between 0 to 10"
                  required
                  min="0"
                  max="10"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.socialAwareness && (
                  <span className="text-red-500 text-sm">
                    {errors.socialAwareness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Relationship Management :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.relationshipManagement ? "border-red-500" : ""
                  }`}
                  value={relationshipManagement}
                  onChange={(e) => {
                    setRelationshipManagement(e.target.value);
                    setErrors({ ...errors, relationshipManagement: "" });
                  }}
                  placeholder="Enter value between 0 to 10"
                  required
                  min="0"
                  max="10"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.relationshipManagement && (
                  <span className="text-red-500 text-sm">
                    {errors.relationshipManagement}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/riasec")}
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

export default EmotionalIntelligenceTest;
