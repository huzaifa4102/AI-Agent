const express = require("express");
const router = express.Router();
const { handleIncoming } = require("../controllers/whatsapp.controller");

router.post("/webhook", handleIncoming);

module.exports = router;