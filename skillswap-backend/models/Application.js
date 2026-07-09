const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },

    walletAddress: {
      type: String,
      required: true,
    },

    proposal: {
      type: String,
      required: true,
    },

    deliveryDays: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);