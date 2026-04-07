const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/agent.controller");

// POST /api/agent/chat
router.post("/chat", chat);

module.exports = router;