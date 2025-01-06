const Counselor = require("../models/counselor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

// Function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.secretKey, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// Register a new counselor
const register = async (req, res) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  try {
    // Check if counselor with the given email already exists
    let existingCounselor = await Counselor.findOne({ email });

    if (existingCounselor) {
      return res
        .status(400)
        .json({ message: "Counselor with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new counselor instance
    const newCounselor = new Counselor({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save the counselor to the database
    const savedCounselor = await newCounselor.save();

    // Generate JWT token
    const token = generateToken(savedCounselor._id);

    // Respond with token and counselor details
    res.status(201).json({
      message: "Counselor created successfully",
      token,
      counselor: {
        _id: savedCounselor._id,
        firstName: savedCounselor.firstName,
        lastName: savedCounselor.lastName,
        email: savedCounselor.email,
      },
    });
  } catch (error) {
    console.error("Error registering counselor:", error);
    res.status(500).json({
      message: "Unable to register counselor. Please try again later.",
    });
  }
};

// Login an existing counselor
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if counselor with the given email exists
    const counselor = await Counselor.findOne({ email });

    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, counselor.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(counselor._id);

    // Respond with token and counselor details
    res.status(200).json({
      message: "Login successful",
      token,
      counselor: {
        _id: counselor._id,
        firstName: counselor.firstName,
        lastName: counselor.lastName,
        email: counselor.email,
      },
    });
  } catch (error) {
    console.error("Error logging in counselor:", error);
    res
      .status(500)
      .json({ message: "Unable to login counselor. Please try again later." });
  }
};

// Fetch all counselors
const getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find();
    res.json(counselors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//Forgot password controllers

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (email, otp) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pearl@saffrony.ac.in", // Replace with your Gmail address
      pass: "Basic@123", // Replace with your Gmail password
    },
  });

  const mailOptions = {
    from: "pearl@saffrony.ac.in",
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Counselor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 3600000; // OTP valid for 1 hour
    await user.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Counselor.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to handle password reset
const resetPassword = async (req, res) => {
const { email, newPassword } = req.body;

try {
  // Find user by email
  const user = await Counselor.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  user.password = hashedPassword;

  // Save updated user object
  await user.save();

  res.status(200).json({ success: true, message: "Password updated successfully." });
} catch (error) {
  console.error("Password reset failed:", error);
  res.status(500).json({ success: false, message: "Failed to reset password." });
}
};



module.exports = {
  register,
  login,
  getCounselors, // Make sure to export the getCounselors function
  forgotPassword,
  verifyOTP,
  resetPassword,
};
