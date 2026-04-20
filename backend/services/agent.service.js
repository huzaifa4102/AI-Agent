require("dotenv").config();
const axios = require("axios");
const { createTrelloCard } = require("./trello.service");
const { sendConfirmationEmail } = require("./email.service");
const Client = require("../models/Client");
const Project = require("../models/Project");

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

YOUR CONVERSATION FLOW — FOLLOW THIS STRICTLY IN ORDER:

Step 1: Always start your FIRST message with exactly this greeting: "Hello! I'm Bablu, your AI sales consultant at DS Technologies. How can I assist you today?" Then ask what kind of project they are looking for.
Step 2: Listen to their project requirements and give a detailed quote with price range and timeline.
Step 3: Handle any objections like high pricing or timeline concerns professionally and confidently.
Step 4: If client asks for discount, you can offer maximum 20% discount to close the deal.
Step 5: Keep convincing the client until they clearly say YES or agree to move forward.
Step 6: ONLY after client agrees — ask for their full name, email and phone number.
Step 7: ONLY after you have all three — name, email and phone — send the CONFIRMED tag.

YOUR RESPONSE STYLE:
- Write 3 to 4 lines per reply, professional and conversational
- Always introduce yourself as Bablu in the very first message of every new conversation
- Write in plain sentences, no bullet points, no markdown, no asterisks
- Be warm, confident and persuasive like a real senior sales consultant
- Always mention money back guarantee and free 30 day support when quoting
- If client budget is low, explain the value we provide and try to meet in the middle

CONFIRMED TAG RULES — STRICTLY FOLLOW:
- NEVER ask for name, email or phone until client has clearly agreed to proceed
- NEVER send CONFIRMED tag during general conversation
- ONLY send CONFIRMED tag when client has agreed AND you have name + email + phone
- projectSummary must contain ONLY the project description, technology needs and budget
- NEVER include phone number, email or name inside projectSummary
- Example: CONFIRMED|Ali Huzaifa|alihuzaifa@gmail.com|+923001234567|Client wants a web complaint app with postal code search and MP contact feature, budget $1500, timeline 6 weeks
- Format: CONFIRMED|clientName|clientEmail|clientPhone|projectSummary
- This tag must be invisible to client — it will be removed before sending`;

const runAgent = async ({ clientPhone, message, channel = "whatsapp" }) => {
  if (!conversationHistory[clientPhone]) {
    conversationHistory[clientPhone] = [];
  }

  if (!clientData[clientPhone]) {
    clientData[clientPhone] = {
      name: null,
      email: null,
      phone: null,
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
        max_tokens: 300,
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

    // Split by CONFIRMED| to get the tag part
    const confirmedPart = reply.split("CONFIRMED|")[1];
    const parts = confirmedPart.split("|");

    const clientName    = parts[0]?.trim();
    const clientEmail   = parts[1]?.trim();
    const clientMobile  = parts[2]?.trim();

    // Join remaining parts — project summary may contain spaces
    let projectSummary  = parts.slice(3).join(" ").trim();

    // Clean phone number from project summary if AI accidentally included it
    if (clientMobile && projectSummary) {
      projectSummary = projectSummary
        .replace(clientMobile, "")
        .replace(/phone\s*:?\s*[\+\d\s\-\(\)]+/gi, "")
        .replace(/contact\s*:?\s*[\+\d\s\-\(\)]+/gi, "")
        .replace(/\|\s*$/, "")
        .trim();
    }

    // If project summary is empty, build from conversation history
    if (!projectSummary || projectSummary.length < 10) {
      const history = conversationHistory[clientPhone] || [];
      const userMessages = history
        .filter(m => m.role === "user")
        .map(m => m.content)
        .join(". ");
      projectSummary = userMessages.substring(0, 300);
    }

    // Use clientMobile if provided, otherwise fall back to WhatsApp number
    const finalPhone = clientMobile || clientPhone;

    // Remove the CONFIRMED line from the reply shown to client
    reply = reply.split("CONFIRMED|")[0].trim();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🎯 Client confirmed!`);
    console.log(`   Name:    ${clientName}`);
    console.log(`   Email:   ${clientEmail}`);
    console.log(`   Phone:   ${finalPhone}`);
    console.log(`   Channel: ${channel}`);
    console.log(`   Project: ${projectSummary}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    if (clientName && clientEmail && projectSummary) {

      // Save client to MongoDB
      try {
        await Client.findOneAndUpdate(
          { email: clientEmail },
          {
            name: clientName,
            email: clientEmail,
            phone: finalPhone,
            channel: channel,
            projectDetails: projectSummary,
            status: "lead",
          },
          { upsert: true, new: true }
        );
        console.log("✅ Client saved to MongoDB");
      } catch (err) {
        console.error("❌ Client save error:", err.message);
      }

      // Save project to MongoDB
      try {
        await Project.create({
          clientName,
          clientEmail,
          title: `Project — ${clientName}`,
          description: projectSummary,
          status: "new",
          channel,
        });
        console.log("✅ Project saved to MongoDB");
      } catch (err) {
        console.error("❌ Project save error:", err.message);
      }

      // Create Trello card
      await createTrelloCard({
        clientName,
        clientEmail,
        clientPhone: finalPhone,
        projectDetails: projectSummary,
        channel,
      });

      // Send both emails
      await sendConfirmationEmail({
        clientName,
        clientEmail,
        clientPhone: finalPhone,
        projectDetails: projectSummary,
        channel,
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