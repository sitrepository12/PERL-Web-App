const mongoose = require("mongoose");

// Set strictQuery to false to prepare for the upcoming change
mongoose.set("strictQuery", false);

const connectDatabase = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDatabase;
