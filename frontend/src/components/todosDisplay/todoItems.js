import React, { useState } from "react";
import { Chip } from "@mui/material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import axios from "axios";
import { API_URL } from "../../constants";
import { configAuth, getUserAuthInfo } from "../userAuth";
import { ToastError, ToastSuccess } from "../toastNotification";

function TodoItems({ index, todo, fetchTodos }) {
  const [isLoading, setIsLoading] = useState(false);

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
          ToastSuccess(res.data.message);
          setIsLoading(false);
          fetchTodos();
        })
        .catch((err) => {
          console.log(err);
          ToastError(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div className="todo" aria-labelledby={`todo-title-${index}`}>
        <h2 id={`todo-title-${index}`}>{todo.title}</h2>
        <div className="todo-description">
          <p id="todo-description">{todo.description}</p>
        </div>
      </div>

      <div className="mark-completed">
        <div>
          {todo.status === "Todo" ? (
            <Chip
              icon={<AddCircleIcon />}
              label={todo.status}
              aria-label={todo.status}
            />
          ) : todo.status === "In Progress" ? (
            <Chip
              icon={<AvTimerIcon />}
              label={todo.status}
              sx={{ background: "#e8eb8d" }}
              aria-label={todo.status}
            />
          ) : todo.status === "Done" ? (
            <Chip
              icon={<CheckCircleOutlineIcon sx={{ color: "green" }} />}
              label={todo.status}
              sx={{ background: "#6be068" }}
              aria-label={todo.status}
            />
          ) : null}
        </div>
        {todo.status === "Done" ? null : (
          <h6
            className="mark-as-completed-text"
            onClick={() => markAsCompleted(todo._id)}
            aria-label="mark-complete"
            aria-disabled={isLoading}
          >
            Mark as Compeleted/Done
          </h6>
        )}
      </div>
    </>
  );
}

export default TodoItems;
