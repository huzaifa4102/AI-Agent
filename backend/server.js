const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { startSlackBot } = require("./services/slack.listener");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/agent", require("./routes/agent.route"));
app.use("/api/whatsapp", require("./routes/whatsapp.route"));

app.get("/", (req, res) => {
  res.json({ message: "AI Agent backend running!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  startSlackBot();
});