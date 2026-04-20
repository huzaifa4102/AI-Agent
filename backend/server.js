// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const { startSlackBot } = require("./services/slack.listener");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/agent", require("./routes/agent.route"));
// app.use("/api/whatsapp", require("./routes/whatsapp.route"));

// app.get("/", (req, res) => {
//   res.json({ message: "AI Agent backend running!" });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
//   startSlackBot();
// });



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { startSlackBot } = require("./services/slack.listener");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/auth.route"));

app.use("/api/agent", require("./routes/agent.route"));
app.use("/api/whatsapp", require("./routes/whatsapp.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));

app.get("/", (req, res) => {
  res.json({ message: "AI Agent backend running!" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      startSlackBot();
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    app.listen(PORT, () => {
      console.log(`⚠️ Server running without MongoDB`);
      startSlackBot();
    });
  });