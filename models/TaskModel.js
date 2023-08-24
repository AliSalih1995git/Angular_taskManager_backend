const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, default: Date.now },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["to-do", "in-progress", "completed"],
      default: "to-do",
    },
    assignedTo: { type: ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
