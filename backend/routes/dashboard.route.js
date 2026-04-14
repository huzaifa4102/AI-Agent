const express = require("express");
const router = express.Router();
const { getStats, getClients, getProjects, updateProjectStatus } = require("../controllers/dashboard.controller");

router.get("/stats", getStats);
router.get("/clients", getClients);
router.get("/projects", getProjects);
router.patch("/projects/:id", updateProjectStatus);

module.exports = router;