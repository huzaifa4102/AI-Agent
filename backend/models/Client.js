const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  channel: { type: String, enum: ["whatsapp", "slack"], default: "whatsapp" },
  projectDetails: { type: String },
  status: { type: String, enum: ["lead", "active", "completed"], default: "lead" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientSchema);