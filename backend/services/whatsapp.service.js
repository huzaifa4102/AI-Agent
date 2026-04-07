const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (to, body) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`,
      body: body,
    });
    console.log(`✅ WhatsApp sent! SID: ${message.sid}`);
    return message;
  } catch (err) {
    console.error(`❌ WhatsApp send failed:`, err.message);
  }
};

module.exports = { sendWhatsAppMessage };