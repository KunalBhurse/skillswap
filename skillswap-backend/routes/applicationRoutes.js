const express = require("express");

const router = express.Router();

const {
  createApplication,
  getApplications,
  getApplicationsForTask,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", createApplication);

router.get("/", getApplications);

router.get("/task/:taskId", getApplicationsForTask);

router.put("/:id", updateApplicationStatus);

module.exports = router;