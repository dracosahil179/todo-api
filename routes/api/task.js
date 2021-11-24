const express = require("express");
const auth = require("../../middleware/auth");
const Task = require("../../models/Task");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/create-task", auth, async (req, res) => {
  try {
    const { taskTitle, taskDescription } = req.body;

    let task = new Task({ taskTitle, taskDescription, user: req.user.id });

    await task.save();

    return res.json({ statusCode: 200, message: "Task Save!", data: task });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { taskTitle, taskDescription } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.json({ statusCode: 404, message: "Task not found" });
    }

    await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { taskTitle: taskTitle, taskDescription: taskDescription } },
      { new: true }
    );

    return res.json({ statusCode: 200, message: "Task Updated!" });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, message: "Task Deleted!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
