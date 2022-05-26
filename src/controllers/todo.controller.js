const { default: mongoose } = require("mongoose");
const todoModel = require("../models/todo.model");

exports.add = async (req, res) => {
  try {
    if (req.body.content === "") res.json({message: "Please add todo.",})
    const isExist = await todoModel.findOne({ content: req.body.content });

    if (isExist) {
      res.json({
        status: 201,
        message: "Task Exist.",
      });
    } else {
      const newTodo = todoModel({
        content: req.body.content,
      });
      const todo = await newTodo.save();
      res.json({
        status: 200,
        message: "Todo added successfully.",
        data: todo,
      });
    }
  } catch (err) {
    throw err.message;
  }
};

exports.list = async (req, res) => {
  try {
    const todoList = await todoModel.find();

    if (todoList && todoList.length > 0) {
      res.json({
        status: 200,
        message: "Todo list found successfully.",
        data: todoList,
      });
    } else {
      res.json({
        status: 404,
        message: "No todo found.",
      });
    }
  } catch (err) {
    throw err.message;
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body && !req.body.todoId) {
      res.json({
        status: 412,
        message: "todoId required field.",
      });
    }
    const todoDelete = await todoModel.deleteOne({
      _id: mongoose.Types.ObjectId(req.body.todoId),
    });
    console.log(todoDelete);
    if (todoDelete.deletedCount > 0) {
      res.json({
        status: 200,
        message: "Todo deleted successfully.",
      });
    } else {
      res.json({
        status: 404,
        message: "Todo not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    const todoExist = await todoModel.findById(req.body.todoId);
    if (!todoExist) {
      res.json({ status: 404, message: "Todo not found." });
    }
    await todoModel.findByIdAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.body.todoId),
      },
      {
        $set: {
          content: req.body.content,
        },
      }
    );
    res.json({
      status: 200,
      message: "Todo updated successfully.",
    });
  } catch (err) {
    throw err.message;
  }
};
