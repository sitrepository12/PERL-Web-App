import { useState } from "react";
import logo from "./logo.png";
import safflogo from "./safflogo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [gender, setGender] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  const handleQrCodeChange = (event) => {
    setQrCode(event.target.files[0]);
  };

  const handleQrCodeSubmit = async () => {
    if (!qrCode) {
      toast.error("No QR code selected", toastOptions);
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(qrCode.type)) {
      toast.error(
        "Invalid file type. Only PNG and JPEG are allowed.",
        toastOptions
      );
      return;
    }

    if (qrCode.size > 5 * 1024 * 1024) {
      toast.error(
        "File size too large. Please upload a file smaller than 5MB.",
        toastOptions
      );
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("qrCode", qrCode);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const qrCodeId = response.data.result;
      if (qrCodeId) {
        const generatedEmail = `${qrCodeId}@saffrony.ac.in`;
        setGeneratedEmail(generatedEmail);
        setEmail(generatedEmail);
        toast.success("QR Code uploaded successfully", toastOptions);
      } else {
        toast.error(
          "Failed to get QR code ID from the response.",
          toastOptions
        );
      }
    } catch (error) {
      console.error("Error uploading QR code:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred during QR code upload. Please try again."
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to upload QR code. Please try again.",
        toastOptions
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      toast.error("Passwords do not match", toastOptions);
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      toast.error("Please enter a valid email address", toastOptions);
      return;
    }

    // Create user data object
    const userData = {
      firstName,
      middleName,
      lastName,
      batch: endDate ? endDate.getFullYear().toString() : "",
      gender,
      branch,
      email,
      password,
    };

    try {
      // Make POST request to the server
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract token and store it
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Notify success and navigate
      toast.success("Created Account Successfully", toastOptions);
      setTimeout(() => {
        navigate("/mainPage");
      }, 3000); // Delay navigation by 3 seconds
    } catch (error) {
      console.error("Error signing up:", error);

      // Handle error response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message, toastOptions);
      } else {
        setErrorMessage("An error occurred during signup. Please try again.");
        toast.error(
          "Failed to create account. Please try again.",
          toastOptions
        );
      }
    }
  };

  // Helper function to validate email format
  const validateEmail = (email) => {
    // Regular expression to check valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <ToastContainer {...toastOptions} />
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-xl p-10 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center mb-5">
              <img
                src={safflogo}
                alt="S.P.B. Patel Engineering College"
                className="mx-5 h-20"
              />
              <img
                src={logo}
                alt="S.P.B. Patel Engineering College"
                className="mx-5 mb-0 h-36"
              />
            </div>
            <h2 className="text-4xl font-bold text-center mb-5">
              Create your account
            </h2>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  pattern="[A-Za-z]+"
                  title="First Name should contain only letters"
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                />
                <input
                  type="text"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                  pattern="[A-Za-z]+"
                  title="Middle Name should contain only letters"
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                />
              </div>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  pattern="[A-Za-z]+"
                  title="Last Name should contain only letters"
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                />
                <div className="w-full sm:w-[48%]">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    placeholderText="Select Batch"
                    dateFormat="yyyy"
                    showYearPicker
                    className="w-full p-2 text-lg border border-gray-300 rounded-md h-11"
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <select
                  required
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  required
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                >
                  <option value="" disabled>
                    Branch
                  </option>
                  <option value="IT">Information Technology</option>
                  <option value="CE">Computer Engineering</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  {/* Add more branches as needed */}
                </select>
              </div>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full sm:w-[48%] p-2 text-lg border border-gray-300 rounded-md h-11"
                />
              </div>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-2 text-lg border border-gray-300 rounded-md h-11"
                />
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleQrCodeChange}
                  className="w-full p-2 text-lg border border-gray-300 rounded-md h-11"
                />
              </div>
              <div className="flex flex-wrap justify-between mb-4 gap-4">
                <button
                  type="button"
                  onClick={handleQrCodeSubmit}
                  disabled={isUploading}
                  className="w-full sm:w-[48%] bg-blue-500 text-white p-2 text-lg rounded-md h-11 flex items-center justify-center"
                >
                  {isUploading ? "Generating..." : "Generate Email"}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-[48%] bg-green-500 text-white p-2 text-lg rounded-md h-11 flex items-center justify-center"
                >
                  Create Account
                </button>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="text-blue-500 underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
