const axios = require("axios");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const callGroq = async (messages) => {
  const response = await axios.post(
    GROQ_API_URL,
    {
      model: "llama-3.3-70b-versatile",   
      messages: [
        {
          role: "system",
          content:
            "You are a smart, helpful AI assistant. Answer clearly and concisely. If you don't know something, say so honestly. Be friendly and professional.",
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    }
  );

  const reply = response.data.choices[0]?.message?.content;
  if (!reply) throw new Error("No response from Groq API");
  return reply;
};

module.exports = { callGroq };