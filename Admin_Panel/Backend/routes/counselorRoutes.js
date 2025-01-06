const express = require("express");
const router = express.Router();
const counselorController = require("../controllers/counselorController");

//Get all the counsellors from the database
router.get("/", counselorController.getCounselors);

// POST request to login
router.post("/login", counselorController.login);
router.post("/register", counselorController.register);

//Forgot Password routes
router.post('/password/forgot', counselorController.forgotPassword);

router.post('/password/verify-otp', counselorController.verifyOTP);

//reset Password
router.put('/password/reset', counselorController.resetPassword);





module.exports = router;
