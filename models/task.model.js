const mongoose = require("mongoose");
const taskTypes = require("../utils/taskTypes");

var taskSchema = new mongoose.Schema(
  {
    user: String,
    title: String,
    description: String,
    type: { type: String, enum: taskTypes },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
