const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: "Title is Required!",
  },
  taskDescription: {
    type: String,
    required: "Description is Required!",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model("task", TaskSchema);
