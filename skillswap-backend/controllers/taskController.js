const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      status: "Open",
    }).sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getTaskById = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    const Application = require("../models/Application");

    await Application.deleteMany({
      taskId: req.params.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
const getMyTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      postedBy: req.params.wallet
    }).sort({ createdAt: -1 });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};
const getDashboardStats = async (req, res) => {
  try {

    const Task = require("../models/Task");
    const Application = require("../models/Application");

    const totalTasks = await Task.countDocuments();

    const totalApplications = await Application.countDocuments();

    const totalBudget = await Task.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$budget" }
        }
      }
    ]);
    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    res.json({
      totalTasks,
      totalApplications,
      completedTasks,
      totalBudget:
        totalBudget.length > 0
          ? totalBudget[0].total
          : 0,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};
module.exports = {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  getMyTasks,
  getDashboardStats,
  updateTaskStatus,
};

