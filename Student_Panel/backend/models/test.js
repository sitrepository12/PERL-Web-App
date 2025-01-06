const mongoose = require("mongoose");

const mbtiSchema = new mongoose.Schema({
  Extraverted: { type: String, required: true },
  Introverted: { type: String, required: true },
  Sensing: { type: String, required: true },
  Intuition: { type: String, required: true },
  Thinking: { type: String, required: true },
  Feeling: { type: String, required: true },
  Judging: { type: String, required: true },
  Perceiving: { type: String, required: true },
  AuditoryLearning: { type: String, required: true },
  VisualLearning: { type: String, required: true },
  KinestheticLearning: { type: String, required: true },
  LeftBrain: { type: String, required: true },
  RightBrain: { type: String, required: true },
  IntelligenceType: { type: String, required: true },
  IntelligenceScore: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const riasecSchema = new mongoose.Schema({
  Realistic: { type: String, required: true },
  Investigative: { type: String, required: true },
  Artistic: { type: String, required: true },
  Social: { type: String, required: true },
  Enterprising: { type: String, required: true },
  Conventional: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const oceanSchema = new mongoose.Schema({
  Openness: { type: String, required: true },
  Conscientiousness: { type: String, required: true },
  Extraversion: { type: String, required: true },
  Agreeableness: { type: String, required: true },
  NaturalReactions: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const hiremeSchema = new mongoose.Schema({
  Verbal: { type: String, required: true },
  Quantitative: { type: String, required: true },
  Logical: { type: String, required: true },
  Core: { type: String, required: true },
  Fundamentals: { type: String, required: true },
  Communication: { type: String, required: true },
  AffectiveCommunication: { type: String, required: true },
  Assertiveness: { type: String, required: true },
  DesireToLead: { type: String, required: true },
  Trusting: { type: String, required: true },
  Diversity: { type: String, required: true },
  SocialRelationship: { type: String, required: true },
  RelationshipBuilding: { type: String, required: true },
  TeamSpirit: { type: String, required: true },
  Recognition: { type: String, required: true },
  Security: { type: String, required: true },
  Planning: { type: String, required: true },
  AchievementOrientation: { type: String, required: true },
  ProcessOrientation: { type: String, required: true },
  ServiceOrientation: { type: String, required: true },
  SystemOrientation: { type: String, required: true },
  SelfEsteem: { type: String, required: true },
  SelfConfidence: { type: String, required: true },
  Empathy: { type: String, required: true },
  DecisionMaking: { type: String, required: true },
  Creativity: { type: String, required: true },
  Innovation: { type: String, required: true },
  ProblemSolving: { type: String, required: true },
  Inquisitiveness: { type: String, required: true },
  Adaptability: { type: String, required: true },
  Flexibility: { type: String, required: true },
  Integrity: { type: String, required: true },
  Dutifulness: { type: String, required: true },
  Accountability: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const emotionalIntelligenceSchema = new mongoose.Schema({
  selfAwareness: { type: String, required: true },
  selfManagement: { type: String, required: true },
  socialAwareness: { type: String, required: true },
  relationshipManagement: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const discSchema = new mongoose.Schema({
  Dominance: { type: String, required: true },
  Influence: { type: String, required: true },
  Steadiness: { type: String, required: true },
  Compliance: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const MBTI = mongoose.model("MBTI", mbtiSchema);
const RIASEC = mongoose.model("RIASEC", riasecSchema);
const OCEAN = mongoose.model("OCEAN", oceanSchema);
const HireMe = mongoose.model("HireMe", hiremeSchema);
const EmotionalIntelligence = mongoose.model(
  "EmotionalIntelligence",
  emotionalIntelligenceSchema
);
const DISC = mongoose.model("DISC", discSchema);

module.exports = { MBTI, RIASEC, OCEAN, HireMe, EmotionalIntelligence, DISC };
