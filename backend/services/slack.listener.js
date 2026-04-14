const { slackApp } = require("./slack.service");
const { runAgent } = require("./agent.service");

const startSlackBot = async () => {
  // Listen for direct messages sent to your bot
  slackApp.message(async ({ message, say }) => {
    // Ignore bot messages to avoid infinite loops
    if (message.subtype === "bot_message" || message.bot_id) return;

    const userId = message.user;
    const text = message.text;

    console.log(`📩 Incoming Slack DM from ${userId}: ${text}`);

    const reply = await runAgent({
      clientPhone: `slack_${userId}`,
      message: text,
      channel: "slack",
    });

    console.log(`🤖 Slack AI Reply: ${reply}`);

    await say(reply);
  });

  // Listen when someone mentions @AI Agent in any channel
  slackApp.event("app_mention", async ({ event, say }) => {
    if (event.bot_id) return;

    const userId = event.user;
    const text = event.text;

    console.log(`📩 Slack mention from ${userId}: ${text}`);

    const reply = await runAgent({
      clientPhone: `slack_${userId}`,
      message: text,
      channel: "slack",
    });

    await say(reply);
  });

  // Start the Slack bot
  await slackApp.start();
  console.log("✅ Slack bot is running!");
};

module.exports = { startSlackBot };