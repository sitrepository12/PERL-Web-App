const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateJwtToken } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");
const QrCode = require("qrcode-reader");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("qrCode");

// File type check
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// QR code upload controller
exports.uploadQrCode = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: "No file selected" });
      } else {
        const imgPath = req.file.path;
        Jimp.read(fs.readFileSync(imgPath), (err, image) => {
          if (err) {
            return res.status(500).json({ message: "Error reading image" });
          }
          const qr = new QrCode();
          qr.callback = (err, value) => {
            if (err) {
              return res.status(500).json({ message: "Error reading QR code" });
            }
            const qrCodeId = value.result;
            fs.unlinkSync(imgPath); // Clean up the uploaded file
            return res.status(200).json({ result: qrCodeId });
          };
          qr.decode(image.bitmap);
        });
      }
    }
  });
};

// User registration controller

exports.signUpUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      batch,
      gender,
      branch,
      email,
      password,
    } = req.body;

    // Basic input validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      middleName,
      batch,
      gender,
      branch,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Generate token
    const token = generateJwtToken(newUser);

    // Respond with success message
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get users based on query parameters
exports.getUsers = async (req, res) => {
  const { branch, batch } = req.query;

  try {
    const query = {};
    if (branch === "All") {
      query.branch = { $in: ["CE", "IT", "ME", "CL"] };
    } else if (branch) {
      query.branch = branch;
    }
    if (batch) {
      query.batch = batch;
    }

    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateJwtToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  const { branch, batch } = req.query; // Extract branch and batch from query parameters

  try {
    const query = {};

    if (branch == "All") {
      query.branch = { $in: ["CE", "IT", "ME", "CL"] };
    } else if (branch) {
      query.branch = branch;
    }

    if (batch) {
      query.batch = batch;
    }

    // Execute query using Mongoose
    const users = await User.find(query);

    // Send JSON response with found users
    res.json(users);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if OTP verification is required

    // Generate token
    const token = generateJwtToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserCounselor = async (req, res) => {
  const userId = req.params.id;
  const counselor = req.params.counselor;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the counselor field
    user.counselor = counselor;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Counselor updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Forgot Password

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
    subject: "Your Password Reset OTP",
    text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
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

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to handle password reset
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;

    // Save updated user object
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Password reset failed:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reset password." });
  }
};

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Controller function to handle file upload and QR code scanning
// Controller function to handle file upload and QR code scanning
exports.uploadAndScanQrCode = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send("Error uploading file.");
    } else {
      if (req.file === undefined) {
        return res.status(400).send("Error: No file selected!");
      } else {
        // Scan the QR code
        Jimp.read(req.file.path)
          .then((image) => {
            const qr = new QrCode();
            qr.callback = (err, value) => {
              if (err) {
                console.error("Error decoding QR code:", err);
                return res.status(500).send("Error decoding QR code!");
              }

              // Send the result of the QR code decoding back to the client
              res.status(200).json({ result: value.result });

              // Optionally, delete the uploaded file after processing
              fs.unlinkSync(req.file.path);
            };

            qr.decode(image.bitmap);
          })
          .catch((err) => {
            console.error("Error reading the image file:", err);
            res.status(500).send("Error reading the image file!");
          });
      }
    }
  });
};
