const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    postedBy: {
      type: String,
      default: "Anonymous",
    },

    // NEW
    status: {
      type: String,
      enum: ["Open", "Accepted", "Completed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);