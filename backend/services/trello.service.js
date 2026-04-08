require("dotenv").config();
const axios = require("axios");

const TRELLO_BASE = "https://api.trello.com/1";

const createTrelloCard = async ({ clientName, clientEmail, projectDetails, channel }) => {
  try {
    const cardName = `New Lead: ${clientName}`;
    const cardDesc = `
Client Name: ${clientName}
Client Email: ${clientEmail}
Channel: ${channel}
Project Details: ${projectDetails}
Date: ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}
    `.trim();

    const response = await axios.post(`${TRELLO_BASE}/cards`, null, {
      params: {
        name: cardName,
        desc: cardDesc,
        idList: process.env.TRELLO_LIST_ID,
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_TOKEN,
      },
    });

    console.log(`✅ Trello card created: ${cardName}`);
    return response.data;

  } catch (err) {
    console.error("❌ Trello error:", err.message);
  }
};

module.exports = { createTrelloCard };