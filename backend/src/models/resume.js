const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  experience: String,
  rawText: String,
  uploadDAte: {
    type: Date,
    default: Date.now,
  },

  uploadBy: String,
  manualCorrections: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
