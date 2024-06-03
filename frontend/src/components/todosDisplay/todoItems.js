import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip, IconButton, Tooltip } from "@mui/material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { configAuth, getUserAuthInfo } from "../userAuth";

function TodoItems({ todo, fetchTodos }) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // delete to function
  const handleDeleteTodo = async (todoId) => {
    const confirm = window.confirm("Are you sure want to delete this Todo?");
    const userInfo = getUserAuthInfo();
    if (confirm) {
      setIsLoading(true);
      try {
        const data = await axios.delete(
          `${API_URL}/${todoId}`,
          configAuth(userInfo)
        );
        fetchTodos();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // mark as complete todo function
  const markAsCompleted = async (todoId) => {
    const confirm = window.confirm("Are you sure want to complete this Todo?");
    const userInfo = getUserAuthInfo();
    if (confirm) {
      setIsLoading(true);
      await axios
        .put(
          `${API_URL}/${todoId}`,
          {
            title: todo.title,
            description: todo.description,
            status: "Done",
          },
          configAuth(userInfo)
        )
        .then((res) => {
          setIsLoading(false);
          fetchTodos();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <div
      className={
        todo.status === "Done" ? "todo-container tododone" : "todo-container"
      }
    >
      <div className="todo-top">
        <div className="todo-time-date">
          <h3>{todo.time}</h3>
          <p>{todo.date}</p>
        </div>
        <div>
          <Tooltip title="Edit">
            <IconButton
              disabled={isLoading}
              onClick={() => navigate(`/update/${todo._id}`)}
            >
              <EditIcon sx={{ color: "blue" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              disabled={isLoading}
              onClick={() => handleDeleteTodo(todo._id)}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="todo">
        <h2>{todo.title}</h2>
        <div className="todo-description">
          <p>{todo.description}</p>
        </div>
      </div>

      <div className="mark-completed">
        <div>
          {todo.status === "Todo" ? (
            <Chip icon={<AddCircleIcon />} label={todo.status} />
          ) : todo.status === "In Progress" ? (
            <Chip
              icon={<AvTimerIcon />}
              label={todo.status}
              sx={{ background: "#e8eb8d" }}
            />
          ) : todo.status === "Done" ? (
            <Chip
              icon={<CheckCircleOutlineIcon sx={{ color: "green" }} />}
              label={todo.status}
              sx={{ background: "#6be068" }}
            />
          ) : null}
        </div>
        {todo.status === "Done" ? null : (
          <h6
            className="mark-as-completed-text"
            onClick={() => markAsCompleted(todo._id)}
          >
            Mark as Compeleted/Done
          </h6>
        )}
      </div>
    </div>
  );
}

export default TodoItems;
