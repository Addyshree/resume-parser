// controllers/resumeController.js
const Resume = require("../models/Resume");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const extractInfoFromText = (text) => {
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const skills = [];

  if (text.toLowerCase().includes("react")) skills.push("React");
  if (text.toLowerCase().includes("node")) skills.push("Node.js");
  if (text.toLowerCase().includes("mongodb")) skills.push("MongoDB");
  if (text.toLowerCase().includes("javascript")) skills.push("JavaScript");

  return {
    name: text.split("\n")[0].trim(), // crude assumption
    email: text.match(emailRegex)?.[0] || "",
    skills,
    experience: text.includes("experience")
      ? "Experience mentioned"
      : "Not found",
  };
};

exports.uploadResume = async (req, res) => {
  try {
    const file = req.file;
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);

    const extracted = extractInfoFromText(pdfData.text);

    const newResume = new Resume({
      ...extracted,
      rawText: pdfData.text,
      uploadedBy: req.body.uploadedBy || "unknown",
    });

    await newResume.save();
    fs.unlinkSync(file.path); // remove file after processing

    res.status(200).json({ message: "Resume uploaded", data: newResume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getResumes = async (req, res) => {
  const { keyword, skill } = req.query;
  const query = {};

  if (keyword) {
    query.rawText = { $regex: keyword, $options: "i" };
  }

  if (skill) {
    query.skills = { $in: [skill] };
  }

  const resumes = await Resume.find(query);
  res.json(resumes);
};

exports.editResume = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedResume = await Resume.findByIdAndUpdate(id, updates, {
    new: true,
  });
  res.json(updatedResume);
};

exports.getUploadHistory = async (req, res) => {
  const resumes = await Resume.find().sort({ uploadDate: -1 });
  res.json(resumes);
};
