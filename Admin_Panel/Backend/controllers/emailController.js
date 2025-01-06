const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.memoryStorage(); // Store the file in memory

// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size (adjust as necessary)
  },
});
const sendEmail = async (req, res) => {
  try {
    const { email, message } = req.body;
    const pdf = req.file; // Assuming multer has saved the file in req.file

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pearl@saffrony.ac.in", // Use environment variable for security
        pass: "Basic@123", // Use environment variable for security
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Pearl Report",
      text: message,
      attachments: [
        {
          filename: "report.pdf",
          content: pdf.buffer, // Access the buffer of the uploaded file
        },
      ],
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
const assignCounselor = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pearl@saffrony.ac.in", // Replace with your Gmail address
        pass: "Basic@123", // Replace with your Gmail password (consider using environment variables for security)
      },
    });

    // Mail options
    const mailOptions = {
      from: "pearl@saffrony.ac.in", // Replace with your Gmail address
      to: to,
      subject: subject,
      text: text,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = {
  sendEmail,
  assignCounselor,
};
