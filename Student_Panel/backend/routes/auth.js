const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { uploadAndScanQrCode } = require("../controllers/auth");

//Get all the users from the database
router.get("/users", authController.getUsers);

// Route to get user by ID
router.get("/users/:userId", authController.getUserById);

// Signup route
router.post("/signup", authController.signUpUser);
// // Login route
router.post("/login", authController.loginUser);

router.put("/user/:id/:counselor", authController.updateUserCounselor);

//Forgot Password routes
router.post("/password/forgot", authController.forgotPassword);

router.post("/password/verify-otp", authController.verifyOTP);

//reset Password
router.put("/password/reset", authController.resetPassword);

router.post("/upload", authController.uploadAndScanQrCode);

module.exports = router;
