import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MbtiTest.css"; // Import your external CSS file

const MbtiTest = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const IntelligenceType = [
    "Intrapersonal",
    "Visual",
    "Naturalist",
    "Musical",
    "Linguistic",
    "Kinesthetic",
    "Logical",
    "Interpersonal",
  ];

  useEffect(() => {
    // Load data from localStorage
    const savedData = JSON.parse(localStorage.getItem("mbtiData"));
    if (savedData) {
      setFormValues(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    const validationError = validateForm();
    if (validationError) {
      setErrors(validationError);
      return;
    }

    // Save data locally (for example, in localStorage)
    localStorage.setItem("mbtiData", JSON.stringify(formValues));

    // Show success message and redirect after a delay
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
    console.log("Form submission triggered");

    const validationError = validateForm();
    if (validationError) {
      console.log("Validation errors:", validationError);
      setErrors(validationError);

      // Display toast notification for missing fields
      // const missingFields = Object.keys(validationError)
      //   .map((key) => key)
      //   .join(", ");
      // toast.error(`Fill ${missingFields} field(s)`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });

      return;
    }

    try {
      const token = localStorage.getItem("token");
      // Submit data to the backend
      const response = await axios.post(
        "http://localhost:3000/api/test/mbti",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data submitted successfully:", response.data);

      // Show success message and redirect after a delay
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
        navigate("/disc");
      }, 3000);
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error appropriately
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const personalityFields = [
      "Extraverted",
      "Introverted",
      "Sensing",
      "Intuition",
      "Thinking",
      "Feeling",
      "Judging",
      "Perceiving",
    ];
    const learningFields = [
      "AuditoryLearning",
      "VisualLearning",
      "KinestheticLearning",
    ];
    const brainFields = ["LeftBrain", "RightBrain"];

    // Validate each field for required and range constraints
    [
      ...personalityFields,
      ...learningFields,
      ...brainFields,
      "IntelligenceScore",
    ].forEach((field) => {
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

    // Specific validation rules for sum constraints
    if (
      parseInt(formValues.Extraverted || 0) +
        parseInt(formValues.Introverted || 0) !==
      100
    ) {
      newErrors.Extraverted = "Extraverted and Introverted must sum to 100";
      newErrors.Introverted = "Extraverted and Introverted must sum to 100";
    }
    if (
      parseInt(formValues.Sensing || 0) +
        parseInt(formValues.Intuition || 0) !==
      100
    ) {
      newErrors.Sensing = "Sensing and Intuition must sum to 100";
      newErrors.Intuition = "Sensing and Intuition must sum to 100";
    }
    if (
      parseInt(formValues.Thinking || 0) + parseInt(formValues.Feeling || 0) !==
      100
    ) {
      newErrors.Thinking = "Thinking and Feeling must sum to 100";
      newErrors.Feeling = "Thinking and Feeling must sum to 100";
    }
    if (
      parseInt(formValues.Judging || 0) +
        parseInt(formValues.Perceiving || 0) !==
      100
    ) {
      newErrors.Judging = "Judging and Perceiving must sum to 100";
      newErrors.Perceiving = "Judging and Perceiving must sum to 100";
    }
    if (
      parseInt(formValues.LeftBrain || 0) +
        parseInt(formValues.RightBrain || 0) !==
      100
    ) {
      newErrors.LeftBrain = "Left Brain and Right Brain must sum to 100";
      newErrors.RightBrain = "Left Brain and Right Brain must sum to 100";
    }

    // Validate IntelligenceType dropdown
    if (!formValues.IntelligenceType) {
      newErrors.IntelligenceType = "Intelligence type is required";
    }

    // Validate if any personality type is selected
    if (!IntelligenceType.includes(formValues.IntelligenceType)) {
      newErrors.IntelligenceType = "Please select a valid Intelligence type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <div className="container mx-auto bg-white p-6 rounded-lg shadow-md mbti-container">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Enter Your MBTI Test Values
          </h1>
          <p className="text-lg mb-6 text-center">
            Please refer to your{" "}
            <a
              href="https://personalitymax.com/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              MBTI
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
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Personality Type Values:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Extraverted (E)", name: "Extraverted" },
                  { label: "Introverted (I)", name: "Introverted" },
                  { label: "Sensing (S)", name: "Sensing" },
                  { label: "Intuition (N)", name: "Intuition" },
                  { label: "Thinking (T)", name: "Thinking" },
                  { label: "Feeling (F)", name: "Feeling" },
                  { label: "Judging (J)", name: "Judging" },
                  { label: "Perceiving (P)", name: "Perceiving" },
                ].map((field) => (
                  <div className="flex flex-col" key={field.name}>
                    <label className="mb-2">{field.label}:</label>
                    <input
                      type="number"
                      name={field.name}
                      placeholder="Enter value (0-100)"
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className={`p-2 border border-gray-300 rounded ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Learning Style:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Auditory Learning", name: "AuditoryLearning" },
                  { label: "Visual Learning", name: "VisualLearning" },
                  { label: "Kinesthetic Learning", name: "KinestheticLearning" },
                ].map((field) => (
                  <div className="flex flex-col" key={field.name}>
                    <label className="mb-2">{field.label}:</label>
                    <input
                      type="number"
                      name={field.name}
                      placeholder="Enter value (0-100)"
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className={`p-2 border border-gray-300 rounded ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Brain Type:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Left Brain", name: "LeftBrain" },
                  { label: "Right Brain", name: "RightBrain" },
                ].map((field) => (
                  <div className="flex flex-col" key={field.name}>
                    <label className="mb-2">{field.label}:</label>
                    <input
                      type="number"
                      name={field.name}
                      placeholder="Enter value (0-100)"
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className={`p-2 border border-gray-300 rounded ${
                        errors[field.name] ? "border-red-500" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Intelligence Type and Score:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-2">Intelligence Type:</label>
                  <select
                    name="IntelligenceType"
                    value={formValues.IntelligenceType || ""}
                    onChange={handleChange}
                    className={`p-2 border border-gray-300 rounded ${
                      errors.IntelligenceType ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Intelligence Type</option>
                    {IntelligenceType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.IntelligenceType && (
                    <span className="text-red-500 text-sm">
                      {errors.IntelligenceType}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-2">Intelligence Score:</label>
                  <input
                    type="number"
                    name="IntelligenceScore"
                    placeholder="Enter value between 0-40"
                    value={formValues.IntelligenceScore || ""}
                    onChange={handleChange}
                    className={`p-2 border border-gray-300 rounded ${
                      errors.IntelligenceScore ? "border-red-500" : ""
                    }`}
                    min="0"
                    max="40"
                    autoComplete="off"
                    inputMode="numeric"
                  />
                  {errors.IntelligenceScore && (
                    <span className="text-red-500 text-sm">
                      {errors.IntelligenceScore}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:opacity-80"
                onClick={() => navigate("/mainPage")}
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

export default MbtiTest;
