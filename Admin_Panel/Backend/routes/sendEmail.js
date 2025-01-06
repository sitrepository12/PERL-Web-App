const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  sendEmail,
  assignCounselor,
} = require("../controllers/emailController");

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/send-email endpoint
router.post("/send-email", upload.single("pdf"), sendEmail);
router.post("/assign", assignCounselor);
module.exports = router;
