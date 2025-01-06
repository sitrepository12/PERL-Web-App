const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    middleName: { type: String },
    batch: { type: String, required: true },
    gender: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mbti: { type: mongoose.Schema.Types.ObjectId, ref: "MBTI" },
    riasec: { type: mongoose.Schema.Types.ObjectId, ref: "RIASEC" },
    ocean: { type: mongoose.Schema.Types.ObjectId, ref: "OCEAN" },
    hireme: { type: mongoose.Schema.Types.ObjectId, ref: "HireMe" },
    emotionalIntelligence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmotionalIntelligence",
    },
    disc: { type: mongoose.Schema.Types.ObjectId, ref: "DISC" },
    counselor: { type: String },
      otp: {
        type: String,
      },
      otpExpiry: {
        type: Date,
      },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
