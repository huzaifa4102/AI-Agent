const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["new", "in_progress", "completed"], default: "new" },
  channel: { type: String },
  trelloCardId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);