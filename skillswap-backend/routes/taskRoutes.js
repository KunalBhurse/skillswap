const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  getMyTasks,
  getDashboardStats,
  updateTaskStatus,
} = require("../controllers/taskController");


// POST new task
router.post("/", createTask);
// GET all tasks
router.get("/", getTasks);
router.get("/my/:wallet", getMyTasks);
router.get("/stats/dashboard", getDashboardStats);
router.get("/:id", getTaskById);
router.put("/:id/status", updateTaskStatus);

router.delete("/:id", deleteTask);

module.exports = router;