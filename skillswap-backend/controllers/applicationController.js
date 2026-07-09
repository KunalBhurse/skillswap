const Application = require("../models/Application");

// ==============================
// Create Application
// ==============================
const createApplication = async (req, res) => {
  try {

    const {
      taskId,
      walletAddress,
    } = req.body;

    // Check duplicate application
    const existing = await Application.findOne({
      taskId,
      walletAddress,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already applied for this task.",
      });
    }

    const application = await Application.create(req.body);

    res.status(201).json(application);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ==============================
// Get Applications for One Task
// ==============================
const getApplicationsForTask = async (req, res) => {
  try {

    const applications = await Application.find({
      taskId: req.params.taskId,
    }).sort({ createdAt: -1 });

    res.status(200).json(applications);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ==============================
// Update Application Status
// ==============================
const updateApplicationStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.status(200).json(application);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ==============================
// Get All Applications
// ==============================
const getApplications = async (req, res) => {
  try {

    const applications = await Application.find()
      .populate("taskId")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

module.exports = {
  createApplication,
  getApplications,
  getApplicationsForTask,
  updateApplicationStatus,
};