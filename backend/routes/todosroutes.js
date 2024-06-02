const express = require("express");
const {
  postTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoscontroller");
const { verifyJWTToken } = require("../jwt/verifyJWTtoken");

const router = express.Router();

router.route("/").get(verifyJWTToken, getTodos); // route to get all todos
router.route("/create").post(verifyJWTToken, postTodo); // route to create a todo
router
  .route("/:id")
  .get(verifyJWTToken, getTodo)
  .put(verifyJWTToken, updateTodo)
  .delete(verifyJWTToken, deleteTodo); // routes to get a todo, update a todo, delete a todo with there id

module.exports = router;
