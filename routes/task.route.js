const express = require("express");
const { model } = require("mongoose");
var taskRoute = express.Router();
var Task = require("../models/task.model");
const taskTypes = require("../utils/taskTypes");
const passport = require("passport");

// Middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(400)
    .json({ statusCode: 400, message: "not authenticated" });
};

taskRoute.post("/addTask", isLoggedIn, (req, res, next) => {
  var user = req.user;
  var task = new Task({
    user: user.username,
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
  });
  Task.create(task, function (err, post) {
    if (err) return next(err);
  });

  return res.status(200).json({ statusCode: 200, message: "Task Added" });
});
taskRoute.get("/allTasks", isLoggedIn, (req, res, next) => {
  user = req.user;
  Task.find(
    { user: user.username },
    null,
    { sort: "-updatedAt" },
    (err, docs) => {

      var tasks = {};
      taskTypes.forEach((task)=> {
        tasks[task] = []
      })
      docs.forEach((task)=> {
        tasks[task.type].push(task);
      });

      if (err) return next(err);
      else return res.status(200).json({ statusCode: 200, message: tasks });
    }
  );
});
taskRoute.get("/allTasksCount", isLoggedIn, (req, res, next) => {
  user = req.user;
  Task.find(
    { user: user.username },
    null,
    { sort: "-updatedAt" },
    (err, tasks) => {
      if (err) return next(err);
      else {
        var count = {};
        for (var type of taskTypes) {
          count[type] = 0;
        }

        tasks.forEach((task) => {
          count[task.type]++;
        });

        return res.status(200).json({ statusCode: 200, message: count });
      }
    }
  );
});
taskRoute.put("/updateTask/:taskId", isLoggedIn, (req, res, next) => {
  var user = req.user;

  Task.findById(req.params.taskId, function (err, task) {
    if (err) return next(err);
    else if (task == null) {
      return res.status(404).json({ statusCode: 404, message: "Not Found" });
    } else {
      if (task.user != user.username) {
        return res.status(403).json({ statusCode: 403, message: "Forbidden" });
      } else {
        task.title = req.body.title;
        task.description = req.body.description;
        task.type = req.body.type;
        task.save((err, taskUpdated) => {
          if (err) return next(err);
          else
            return res
              .status(200)
              .json({ statusCode: 200, message: taskUpdated });
        });
      }
    }
  });
});
taskRoute.delete("/deleteTask/:taskId", isLoggedIn, (req, res, next) => {
  var user = req.user;

  Task.findById(req.params.taskId, function (err, task) {
    if (err) {
      console.log(err);
      return next(err);
    } else if (task == null) {
      return res.status(404).json({ statusCode: 404, message: "Not Found" });
    } else {
      if (task.user != user.username) {
        return res.status(403).json({ statusCode: 403, message: "Forbidden" });
      } else {
        task.remove((err, result) => {
          if (err) return next(err);
          else
            return res.status(200).json({ statusCode: 200, message: result });
        });
      }
    }
  });
});

module.exports = taskRoute;
