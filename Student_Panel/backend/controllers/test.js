const {
  MBTI,
  RIASEC,
  OCEAN,
  HireMe,
  EmotionalIntelligence,
  DISC,
} = require("../models/test");
const User = require("../models/user");

const submitMBTI = async (req, res) => {
  try {
    const {
      Extraverted,
      Introverted,
      Sensing,
      Intuition,
      Thinking,
      Feeling,
      Judging,
      Perceiving,
      AuditoryLearning,
      VisualLearning,
      KinestheticLearning,
      LeftBrain,
      RightBrain,
      IntelligenceType,
      IntelligenceScore,
    } = req.body;
    const userId = req.user.userId;

    let mbti = await MBTI.findOneAndUpdate(
      { user: userId },
      {
        Extraverted,
        Introverted,
        Sensing,
        Intuition,
        Thinking,
        Feeling,
        Judging,
        Perceiving,
        AuditoryLearning,
        VisualLearning,
        KinestheticLearning,
        LeftBrain,
        RightBrain,
        IntelligenceType,
        IntelligenceScore,
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { mbti: mbti._id });

    res.status(201).json({ message: "MBTI test results saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitRIASEC = async (req, res) => {
  try {
    const {
      Realistic,
      Investigative,
      Artistic,
      Social,
      Enterprising,
      Conventional,
    } = req.body;
    const userId = req.user.userId;

    let riasec = await RIASEC.findOneAndUpdate(
      { user: userId },
      {
        Realistic,
        Investigative,
        Artistic,
        Social,
        Enterprising,
        Conventional,
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { riasec: riasec._id });

    res.status(201).json({ message: "RIASEC test results saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitOCEAN = async (req, res) => {
  try {
    const {
      Openness,
      Conscientiousness,
      Extraversion,
      Agreeableness,
      NaturalReactions,
    } = req.body;
    const userId = req.user.userId;

    let ocean = await OCEAN.findOneAndUpdate(
      { user: userId },
      {
        Openness,
        Conscientiousness,
        Extraversion,
        Agreeableness,
        NaturalReactions,
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { ocean: ocean._id });

    res.status(201).json({ message: "OCEAN test results saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitHireMe = async (req, res) => {
  try {
    const {
      Verbal,
      Quantitative,
      Logical,
      Core,
      Fundamentals,
      Communication,
      AffectiveCommunication,
      Assertiveness,
      DesireToLead,
      Trusting,
      Diversity,
      SocialRelationship,
      RelationshipBuilding,
      TeamSpirit,
      Recognition,
      Security,
      Planning,
      AchievementOrientation,
      ProcessOrientation,
      ServiceOrientation,
      SystemOrientation,
      SelfEsteem,
      SelfConfidence,
      Empathy,
      DecisionMaking,
      Creativity,
      Innovation,
      ProblemSolving,
      Inquisitiveness,
      Adaptability,
      Flexibility,
      Integrity,
      Dutifulness,
      Accountability,
    } = req.body;
    const userId = req.user.userId;

    let hireme = await HireMe.findOneAndUpdate(
      { user: userId },
      {
        Verbal,
        Quantitative,
        Logical,
        Core,
        Fundamentals,
        Communication,
        AffectiveCommunication,
        Assertiveness,
        DesireToLead,
        Trusting,
        Diversity,
        SocialRelationship,
        RelationshipBuilding,
        TeamSpirit,
        Recognition,
        Security,
        Planning,
        AchievementOrientation,
        ProcessOrientation,
        ServiceOrientation,
        SystemOrientation,
        SelfEsteem,
        SelfConfidence,
        Empathy,
        DecisionMaking,
        Creativity,
        Innovation,
        ProblemSolving,
        Inquisitiveness,
        Adaptability,
        Flexibility,
        Integrity,
        Dutifulness,
        Accountability,
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { hireme: hireme._id });

    res.status(201).json({ message: "HireMe test results saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitEmotionalIntelligence = async (req, res) => {
  try {
    const {
      selfAwareness,
      selfManagement,
      socialAwareness,
      relationshipManagement,
    } = req.body;
    const userId = req.user.userId;

    let emotionalIntelligence = await EmotionalIntelligence.findOneAndUpdate(
      { user: userId },
      {
        selfAwareness,
        selfManagement,
        socialAwareness,
        relationshipManagement,
      },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, {
      emotionalIntelligence: emotionalIntelligence._id,
    });

    res.status(201).json({
      message: "Emotional Intelligence test results saved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const submitDISC = async (req, res) => {
  try {
    const { Dominance, Influence, Steadiness, Compliance } = req.body;
    const userId = req.user.userId;

    let disc = await DISC.findOneAndUpdate(
      { user: userId },
      { Dominance, Influence, Steadiness, Compliance },
      { new: true, upsert: true }
    );

    await User.findByIdAndUpdate(userId, { disc: disc._id });

    res.status(201).json({ message: "DISC test results saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get MBTI test results
const getMBTI = async (req, res) => {
  try {
    const userId = req.user.userId;
    const mbti = await MBTI.findOne({ user: userId });
    if (!mbti) {
      return res.status(404).json({ message: "MBTI test results not found" });
    }
    res.status(200).json(mbti);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get RIASEC test results
const getRIASEC = async (req, res) => {
  try {
    const userId = req.user.userId;
    const riasec = await RIASEC.findOne({ user: userId });
    if (!riasec) {
      return res.status(404).json({ message: "RIASEC test results not found" });
    }
    res.status(200).json(riasec);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get OCEAN test results
const getOCEAN = async (req, res) => {
  try {
    const userId = req.user.userId;
    const ocean = await OCEAN.findOne({ user: userId });
    if (!ocean) {
      return res.status(404).json({ message: "OCEAN test results not found" });
    }
    res.status(200).json(ocean);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get HireMe test results
const getHireMe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const hireme = await HireMe.findOne({ user: userId });
    if (!hireme) {
      return res.status(404).json({ message: "HireMe test results not found" });
    }
    res.status(200).json(hireme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get Emotional Intelligence test results
const getEmotionalIntelligence = async (req, res) => {
  try {
    const userId = req.user.userId;
    const emotionalIntelligence = await EmotionalIntelligence.findOne({
      user: userId,
    });
    if (!emotionalIntelligence) {
      return res
        .status(404)
        .json({ message: "Emotional Intelligence test results not found" });
    }
    res.status(200).json(emotionalIntelligence);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get DISC test results
const getDISC = async (req, res) => {
  try {
    const userId = req.user.userId;
    const disc = await DISC.findOne({ user: userId });
    if (!disc) {
      return res.status(404).json({ message: "DISC test results not found" });
    }
    res.status(200).json(disc);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get MBTI test results by student ID
const getMBTIByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const mbti = await MBTI.findOne({ user: studentId });
    if (!mbti) {
      return res.status(404).json({ message: "MBTI test results not found" });
    }
    res.status(200).json(mbti);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get RIASEC test results by student ID
const getRIASECByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const riasec = await RIASEC.findOne({ user: studentId });
    if (!riasec) {
      return res.status(404).json({ message: "RIASEC test results not found" });
    }
    res.status(200).json(riasec);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get OCEAN test results by student ID
const getOCEANByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const ocean = await OCEAN.findOne({ user: studentId });
    if (!ocean) {
      return res.status(404).json({ message: "OCEAN test results not found" });
    }
    res.status(200).json(ocean);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get HireMe test results by student ID
const getHireMeByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const hireme = await HireMe.findOne({ user: studentId });
    if (!hireme) {
      return res.status(404).json({ message: "HireMe test results not found" });
    }
    res.status(200).json(hireme);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get Emotional Intelligence test results by student ID
const getEmotionalIntelligenceByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const emotionalIntelligence = await EmotionalIntelligence.findOne({ user: studentId });
    if (!emotionalIntelligence) {
      return res.status(404).json({ message: "Emotional Intelligence test results not found" });
    }
    res.status(200).json(emotionalIntelligence);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get DISC test results by student ID
const getDISCByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const disc = await DISC.findOne({ user: studentId });
    if (!disc) {
      return res.status(404).json({ message: "DISC test results not found" });
    }
    res.status(200).json(disc);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitMBTI,
  submitRIASEC,
  submitOCEAN,
  submitHireMe,
  submitEmotionalIntelligence,
  submitDISC,
  getMBTI,
  getRIASEC,
  getOCEAN,
  getHireMe,
  getEmotionalIntelligence,
  getDISC,
  getMBTIByStudentId,
  getRIASECByStudentId,
  getOCEANByStudentId,
  getHireMeByStudentId,
  getEmotionalIntelligenceByStudentId,
  getDISCByStudentId,
};