import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DiscTest = () => {
  const navigate = useNavigate();
  const [dominance, setDominance] = useState("");
  const [influence, setInfluence] = useState("");
  const [steadiness, setSteadiness] = useState("");
  const [compliance, setCompliance] = useState("");
  const [errors, setErrors] = useState({
    dominance: "",
    influence: "",
    steadiness: "",
    compliance: "",
    sum: "",
  });


  useEffect(() => {
    // Load data from localStorage
    const savedData = JSON.parse(localStorage.getItem("discData"));
    if (savedData) {
      setDominance(savedData.dominance);
      setInfluence(savedData.influence);
      setSteadiness(savedData.steadiness);
      setCompliance(savedData.compliance);
    }
  }, []);

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {
      dominance: "",
      influence: "",
      steadiness: "",
      compliance: "",
      sum: "",
    };

    // Check if any field is empty
    if (!dominance) {
      newErrors.dominance = "This field is required";
    }
    if (!influence) {
      newErrors.influence = "This field is required";
    }
    if (!steadiness) {
      newErrors.steadiness = "This field is required";
    }
    if (!compliance) {
      newErrors.compliance = "This field is required";
    }

    // Check if any value is not between 0 - 60
    if (dominance < 0 || dominance > 60) {
      newErrors.dominance = "Value must be between 0 and 60";
    }
    if (influence < 0 || influence > 60) {
      newErrors.influence = "Value must be between 0 and 60";
    }
    if (steadiness < 0 || steadiness > 60) {
      newErrors.steadiness = "Value must be between 0 and 60";
    }
    if (compliance < 0 || compliance > 60) {
      newErrors.compliance = "Value must be between 0 and 60";
    }

    // Check if sum of values is not equal to 100
    const sum =
      parseInt(dominance) +
      parseInt(influence) +
      parseInt(steadiness) +
      parseInt(compliance);
    if (sum !== 100) {
      newErrors.sum =
        "Sum of Dominance, Influence, Steadiness, and Compliance must equal 100";
    }

    // Return null if no errors, else return newErrors object
    return Object.keys(newErrors).some((key) => newErrors[key] !== "")
      ? newErrors
      : null;
  };

  // Handle Save button click
  const handleSave = () => {
    const validationError = validateInputs();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    // Save data locally (for example, in localStorage)
    const discData = {
      dominance: dominance,
      influence: influence,
      steadiness: steadiness,
      compliance: compliance,
    };
    localStorage.setItem("discData", JSON.stringify(discData));

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

  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateInputs();
    if (validationError) {
      setErrors(validationError);

      const missingFields = Object.keys(validationError)
        .map((key) => key)
        .join(", ");
      toast.error(`Fill ${missingFields} field(s)`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Prepare data to be submitted
    const discData = {
      Dominance: dominance,
      Influence: influence,
      Steadiness: steadiness,
      Compliance: compliance,
      // Add other fields as needed
    };

    try {
      // Fetch token from localStorage or wherever you store it
      const token = localStorage.getItem("token");

      // Submit data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/test/disc",
        discData,
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
        navigate("/ocean");
      }, 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error states or display error messages to the user
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dominance") {
      setDominance(value);
    } else if (name === "influence") {
      setInfluence(value);
    } else if (name === "steadiness") {
      setSteadiness(value);
    } else if (name === "compliance") {
      setCompliance(value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Enter Your DISC Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to your{" "}
            <a
              href="https://www.123test.com/disc-personality-test/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              DISC
            </a>{" "}
            reports to enter the values for the different parameters as given
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
                <label className="mb-2">Dominance :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.dominance ? "border-red-500" : ""
                  }`}
                  value={dominance}
                  onChange={(e) => {
                    setDominance(e.target.value);
                    setErrors({ ...errors, dominance: "" });
                  }}
                  placeholder="Enter value between 0 to 60"
                  required
                  min="0"
                  max="60"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.dominance && (
                  <span className="text-red-500 text-sm">
                    {errors.dominance}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Influence :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.influence ? "border-red-500" : ""
                  }`}
                  value={influence}
                  onChange={(e) => {
                    setInfluence(e.target.value);
                    setErrors({ ...errors, influence: "" });
                  }}
                  placeholder="Enter value between 0 to 60"
                  required
                  min="0"
                  max="60"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.influence && (
                  <span className="text-red-500 text-sm">
                    {errors.influence}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Steadiness :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.steadiness ? "border-red-500" : ""
                  }`}
                  value={steadiness}
                  onChange={(e) => {
                    setSteadiness(e.target.value);
                    setErrors({ ...errors, steadiness: "" });
                  }}
                  placeholder="Enter value between 0 to 60"
                  required
                  min="0"
                  max="60"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.steadiness && (
                  <span className="text-red-500 text-sm">
                    {errors.steadiness}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Compliance :</label>
                <input
                  type="number"
                  className={`p-2 border rounded ${
                    errors.compliance ? "border-red-500" : ""
                  }`}
                  value={compliance}
                  onChange={(e) => {
                    setCompliance(e.target.value);
                    setErrors({ ...errors, compliance: "" });
                  }}
                  placeholder="Enter value between 0 to 60"
                  required
                  min="0"
                  max="60"
                  autoComplete="off"
                  inputMode="numeric"
                />
                {errors.compliance && (
                  <span className="text-red-500 text-sm">
                    {errors.compliance}
                  </span>
                )}
              </div>
            </div>
            {errors.sum && <p className="text-red-500 text-sm">{errors.sum}</p>}
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/mbti")}
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

export default DiscTest;
