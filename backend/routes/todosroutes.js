const express = require("express");
const {
  postTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoscontroller");

const router = express.Router();

router.route("/").get(getTodos); // route to get all todos
router.route("/create").post(postTodo); // route to create a todo
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo); // routes to get a todo, update a todo, delete a todo with there id

module.exports = router;
