const mongoose = require("mongoose");
const Todos = require("../models/todosmodel");

// function to get all the todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todos.find({ email: req.user.email });

    if (todos) {
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// function to create a todo
const postTodo = async (req, res) => {
  try {
    const { title, description, status, email } = req.body;
    const todos = await Todos.create({ title, description, status, email });

    if (todos) {
      res.status(201).json({
        message: "Todo created Successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// function to get a single todo with the corresponding id
const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findById(id);

    if (todo) {
      res.status(200).json(todo);
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// function to update a todo with the corresponding id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTodo = await Todos.findByIdAndUpdate(id, {
      title,
      description,
      status,
      email: req.user.email,
    });

    if (updatedTodo) {
      res.status(200).json({
        message: "Todo Updated Successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// function to delete a todo with the corresponding id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletetodo = await Todos.deleteOne({ _id: id });

    if (deletetodo) {
      res.status(200).json({
        message: "Todo deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// delete multiple function
const deleteMultipleTodo = async (req, res) => {
  const { ids } = req.body;
  const newIds = ids.map((id) => new mongoose.Types.ObjectId(id));

  try {
    const deleteMultiple = await Todos.deleteMany({
      _id: { $in: newIds },
    });

    res.status(200).json({
      message: "Todos are deleted Sucessfully",
      deletecount: deleteMultiple.deletedCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

module.exports = {
  postTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  deleteMultipleTodo,
};
