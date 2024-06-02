const Todos = require("../models/todosmodel");

// function to get all the todos
const getTodos = async (req, res) => {
  const todos = await Todos.find({ email: req.user.email });

  if (todos) {
    res.json(todos);
  } else {
    res.status(400).json("Something went wrong! Unable to fetch the todos");
  }
};

// function to create a todo
const postTodo = async (req, res) => {
  const { title, description, status, email } = req.body;

  const todos = Todos.create({ title, description, status, email });

  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(400).json("Something went wrong! Unable to create a todo");
  }
};

// function to get a single todo with the corresponding id
const getTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todos.findById(id);

  if (todo) {
    res.json(todo);
  } else {
    res
      .status(400)
      .json(`Something went wrong! Unable to fetch a todo with id ${id}`);
  }
};

// function to update a todo with the corresponding id
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const updatedTodo = await Todos.findByIdAndUpdate(id, {
    title,
    description,
    status,
    email: req.user.email,
  });

  if (updatedTodo) {
    res.json(updatedTodo);
  } else {
    res
      .status(400)
      .json(`Something went wrong! Unable to update a todo with id ${id}`);
  }
};

// function to delete a todo with the corresponding id
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const deletetodo = await Todos.deleteOne({ _id: id });

  if (deletetodo) {
    res.json(deletetodo);
  } else {
    res
      .status(400)
      .json(`Something went wrong! Unable to delete a todo with id ${id}`);
  }
};

module.exports = { postTodo, getTodos, getTodo, updateTodo, deleteTodo };
