// const { App } = require("@slack/bolt");

// const slackApp = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
// });

// const sendSlackMessage = async (channel, text) => {
//   try {
//     await slackApp.client.chat.postMessage({
//       channel: channel,
//       text: text,
//     });
//     console.log(`✅ Slack message sent to ${channel}`);
//   } catch (err) {
//     console.error("❌ Slack send failed:", err.message);
//   }
// };

// module.exports = { slackApp, sendSlackMessage };




require("dotenv").config();
const { App } = require("@slack/bolt");

const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const sendSlackMessage = async (channel, text) => {
  try {
    await slackApp.client.chat.postMessage({
      channel: channel,
      text: text,
    });
    console.log(`✅ Slack message sent to ${channel}`);
  } catch (err) {
    console.error("❌ Slack send failed:", err.message);
  }
};

module.exports = { slackApp, sendSlackMessage };