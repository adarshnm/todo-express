const mongoose = require("mongoose");
const taskSchema = require("./task.model").model("Task").schema;
const passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  tasks: [taskSchema],
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema, "users");
