const { callGroq } = require("../services/groq.service");

const chat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const reply = await callGroq(messages);
    res.json({ reply });

  } catch (error) {
    console.error("❌ Controller error:", error.message);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = { chat };