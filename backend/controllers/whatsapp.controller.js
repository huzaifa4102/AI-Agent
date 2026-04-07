const { runAgent } = require("../services/agent.service");
const { sendWhatsAppMessage } = require("../services/whatsapp.service");

const handleIncoming = async (req, res) => {
  res.status(200).send("OK");

  const from = req.body.From;
  const messageBody = req.body.Body;

  if (!from || !messageBody) {
    console.log("❌ Missing From or Body in request");
    return;
  }

  const clientPhone = from.replace("whatsapp:", "");
  console.log(`📩 Incoming WhatsApp from ${clientPhone}: ${messageBody}`);

  const reply = await runAgent({
    clientPhone,
    message: messageBody,
  });

  console.log(`🤖 AI Reply: ${reply}`);

  await sendWhatsAppMessage(clientPhone, reply);
};

module.exports = { handleIncoming };