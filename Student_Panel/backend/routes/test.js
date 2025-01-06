const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");

const {
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
} = require("../controllers/test");

router.post("/mbti", verifyToken, submitMBTI);
router.post("/riasec", verifyToken, submitRIASEC);
router.post("/ocean", verifyToken, submitOCEAN);
router.post("/hireme", verifyToken, submitHireMe);
router.post("/emotionalintelligence", verifyToken, submitEmotionalIntelligence);
router.post("/disc", verifyToken, submitDISC);

router.get('/mbti', verifyToken, getMBTI);
router.get('/riasec', verifyToken, getRIASEC);
router.get('/ocean', verifyToken, getOCEAN);
router.get('/hireme', verifyToken, getHireMe);
router.get('/emotionalintelligence', verifyToken, getEmotionalIntelligence);
router.get('/disc', verifyToken, getDISC);

// Add routes to get test data by student ID
router.get('/mbti/:studentId', getMBTIByStudentId);
router.get('/riasec/:studentId', getRIASECByStudentId);
router.get('/ocean/:studentId', getOCEANByStudentId);
router.get('/hireme/:studentId', getHireMeByStudentId);
router.get('/emotionalintelligence/:studentId', getEmotionalIntelligenceByStudentId);
router.get('/disc/:studentId', getDISCByStudentId);

module.exports = router;
