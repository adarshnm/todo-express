const mongoose = require("mongoose");
const taskType = ["Todo", "In Progress", "Completed"];

var taskSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    description: String,
    type: { type: String, enum: taskType },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
