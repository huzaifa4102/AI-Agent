const Client = require("../models/Client");
const Project = require("../models/Project");

const getStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: "in_progress" });
    const completedProjects = await Project.countDocuments({ status: "completed" });
    const newLeads = await Client.countDocuments({ status: "lead" });

    res.json({
      totalClients,
      totalProjects,
      activeProjects,
      completedProjects,
      newLeads,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStats, getClients, getProjects, updateProjectStatus };