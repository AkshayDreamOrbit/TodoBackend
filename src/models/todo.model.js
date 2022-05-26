const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {collection: "todo_tasks"});
module.exports = mongoose.model("todo_tasks", todoTaskSchema);