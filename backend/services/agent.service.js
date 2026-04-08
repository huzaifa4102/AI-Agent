require("dotenv").config();
const axios = require("axios");
const { createTrelloCard } = require("./trello.service");
const { sendConfirmationEmail } = require("./email.service");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const conversationHistory = {};
const clientData = {};

const SYSTEM_PROMPT = `You are a senior sales consultant and AI assistant for DS Technologies Pvt. Limited, a leading software company. Your job is to attract clients, give them clear pricing, timelines, and convince them to work with us.

COMPANY OVERVIEW:
DS Technologies Pvt. Limited is a full-service software company delivering cutting-edge digital solutions to clients worldwide. We have 5+ years of experience, 50+ completed projects, and 98% client satisfaction rate.

OUR SERVICES AND PRICING:

1. Custom Software Development
   - Basic web app: $500 - $1,500 | 2-4 weeks
   - Medium complexity web app (MERN stack): $1,500 - $4,000 | 4-8 weeks
   - Enterprise software: $5,000 - $15,000 | 8-16 weeks
   - Technologies: React, Node.js, MERN stack, PHP, Laravel, Python, Django

2. Mobile App Development
   - Basic mobile app: $1,000 - $3,000 | 4-6 weeks
   - Medium complexity app: $3,000 - $8,000 | 6-12 weeks
   - Cross-platform (React Native, Flutter): $2,000 - $6,000 | 5-10 weeks

3. AI and Machine Learning Solutions
   - AI chatbot: $800 - $2,500 | 2-4 weeks
   - Custom AI integration: $2,000 - $8,000 | 4-10 weeks
   - Full AI automation system: $5,000 - $20,000 | 8-16 weeks

4. UI/UX Design
   - Landing page design: $200 - $500 | 3-5 days
   - Full web app design: $500 - $2,000 | 1-3 weeks
   - Mobile app design: $800 - $2,500 | 2-4 weeks

5. E-Commerce Solutions
   - Basic Shopify/WooCommerce store: $400 - $1,200 | 1-2 weeks
   - Custom e-commerce platform: $2,000 - $8,000 | 4-10 weeks

6. Cloud Services and DevOps
   - Cloud setup and deployment: $300 - $1,000 | 3-7 days
   - Full DevOps pipeline: $1,000 - $4,000 | 2-4 weeks

7. Maintenance and Support
   - Basic support plan: $100 - $300 per month
   - Full maintenance package: $300 - $800 per month

WHY CHOOSE DS TECHNOLOGIES:
- 5+ years of industry experience
- 50+ successfully delivered projects
- Free support for 30 days after project completion
- Transparent pricing with no hidden charges
- Money back guarantee if not satisfied in first week
- NDA available for confidential projects

YOUR SALES BEHAVIOR RULES:
- Always give specific price ranges and time estimates
- Be confident, enthusiastic, and professional
- If client shares project details, give instant detailed quote
- Always mention money back guarantee and free 30 day support
- Use plain text only, no markdown, no asterisks
- IMPORTANT: When a client confirms they want to proceed, say they are interested, or provides their name and email together, always respond with this exact format at the end of your reply:
  CONFIRMED|clientName|clientEmail|projectSummary
- Ask for name and email naturally during conversation to collect their details
- CRITICAL: Keep all replies under 500 characters for WhatsApp. Be very short and concise.`;

const runAgent = async ({ clientPhone, message, channel = "whatsapp" }) => {
  if (!conversationHistory[clientPhone]) {
    conversationHistory[clientPhone] = [];
  }

  if (!clientData[clientPhone]) {
    clientData[clientPhone] = {
      name: null,
      email: null,
      project: null,
    };
  }

  conversationHistory[clientPhone].push({
    role: "user",
    content: message,
  });

  if (conversationHistory[clientPhone].length > 10) {
    conversationHistory[clientPhone].shift();
  }

  let reply;
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...conversationHistory[clientPhone],
        ],
        temperature: 0.6,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    reply = response.data.choices[0]?.message?.content?.trim();
    if (!reply) throw new Error("Empty response from Groq");

  } catch (err) {
    console.error("❌ Groq error:", err.message);
    reply = "Sorry, I am having trouble right now. Please try again in a moment.";
    return reply;
  }

  // Check if AI detected a confirmation
  if (reply.includes("CONFIRMED|")) {
    const parts = reply.split("CONFIRMED|")[1].split("|");
    const clientName = parts[0]?.trim();
    const clientEmail = parts[1]?.trim();
    const projectSummary = parts[2]?.trim();

    // Remove the CONFIRMED line from the reply shown to client
    reply = reply.split("CONFIRMED|")[0].trim();

    if (clientName && clientEmail && projectSummary) {
      console.log(`🎯 Client confirmed! Name: ${clientName} Email: ${clientEmail}`);

      // Create Trello card
      await createTrelloCard({
        clientName,
        clientEmail,
        projectDetails: projectSummary,
        channel,
      });

      // Send confirmation email
      await sendConfirmationEmail({
        clientName,
        clientEmail,
        projectDetails: projectSummary,
      });
    }
  }

  conversationHistory[clientPhone].push({
    role: "assistant",
    content: reply,
  });

  return reply;
};

module.exports = { runAgent };