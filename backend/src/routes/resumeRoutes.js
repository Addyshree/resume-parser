const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");

const {
  uploadResume,
  getResumes,
  editResume,
  getUploadHistory,
} = require("../controllers/resumeController");

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/resumes", getResumes);
router.put("resumes/:id", editResume);
router.get("/admin/history", getUploadHistory);

module.exports = router;
