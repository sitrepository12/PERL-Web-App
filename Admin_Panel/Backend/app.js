const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const counselorRoutes = require("./routes/counselorRoutes");
const sendEmailRoutes = require('./routes/sendEmail');


// Load environment variables from .env file
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all origins

// MongoDB Atlas connection string from .env
const mongoURI = process.env.DB_URL;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.use("/api/counselors", counselorRoutes);



// Routes
app.use('/api', sendEmailRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from Server!!!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
