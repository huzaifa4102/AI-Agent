const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  clientPhone: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"] },
  content: { type: String },
  channel: { type: String, default: "whatsapp" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Conversation", conversationSchema);