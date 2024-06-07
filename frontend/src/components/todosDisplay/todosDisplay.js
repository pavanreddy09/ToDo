import React, { useEffect, useState } from "react";

import TodoItems from "./todoItems";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../../constants";
import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import NoData from "../noData";
import { useNavigate } from "react-router-dom";
import { configAuth, getUserAuthInfo } from "../userAuth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastError, ToastSuccess } from "../toastNotification";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function TodosDisplay() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedTodos, setSearchedTodos] = useState([]);
  const [filterValue, setFilterValue] = useState("All");
  const [isMuldelcheckboxEnabled, setIsMuldelcheckboxEnabled] = useState(false);
  const [selectMultipleIds, setSelectedMultipleIds] = useState([]);

  const navigate = useNavigate();

  // fetch todos function
  const fetchTodos = async () => {
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      setIsLoading(true);
      try {
        const { data } = await axios.get(API_URL, configAuth(userInfo));
        data.map((d) => {
          const date = new Date(d.createdAt);
          const createdDate = date.toDateString().split(" ");
          const createdTime = date.toLocaleTimeString().split(":");
          const ampm = date.toLocaleTimeString().split(" ")[1];
          d.date = `${createdDate[2]} ${createdDate[1]} ${createdDate[3]}`; // setting created date
          d.time = `${
            createdTime[0] < 10 ? "0" + createdTime[0] : createdTime[0]
          }:${createdTime[1]} ${ampm.toUpperCase()}`; // setting created time
        });
        setTodos(data);
        setSearchedTodos(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate("/login");
    }
  };

  // search function
  const handleSearchTodo = (e) => {
    const searchText = e.target.value;

    const searchTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchedTodos(searchTodos);
  };

  // handle delete function
  const handleDeleteTodo = async (todoId) => {
    const confirm = window.confirm("Are you sure want to delete this Todo?");
    const userInfo = getUserAuthInfo();
    if (confirm) {
      setIsLoading(true);
      try {
        const { data } = await axios.delete(
          `${API_URL}/${todoId}`,
          configAuth(userInfo)
        );
        ToastSuccess(data.message);
        // console.log(data);
        fetchTodos();
      } catch (err) {
        console.log(err);
        ToastError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // select todo check box function
  const handleCheckBox = (todoId) => {
    if (selectMultipleIds.includes(todoId)) {
      const newSelects = selectMultipleIds.filter((item) => item !== todoId);
      setSelectedMultipleIds(newSelects);
    } else {
      setSelectedMultipleIds([...selectMultipleIds, todoId]);
    }
  };

  // handle multiple delete function
  const handleDeleteMultiple = async () => {
    if (selectMultipleIds.length === 0) {
      return alert("Please select one or more tasks");
    }
    const confirm = window.confirm("Are you sure want to delete these Todos?");
    const userInfo = getUserAuthInfo();
    if (confirm) {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${API_URL}/multidelete`,
          {
            ids: selectMultipleIds,
          },
          configAuth(userInfo)
        );
        ToastSuccess(`${data.deletecount} ${data.message}`);
        fetchTodos();
      } catch (err) {
        console.log(err);
        ToastError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // useEffect for fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  // useEffect for filter by status
  useEffect(() => {
    if (filterValue === "All") {
      setSearchedTodos(todos);
      return;
    }
    const filtervalues = todos.filter((todo) => todo.status === filterValue);
    setSearchedTodos(filtervalues);
  }, [filterValue]);

  return (
    <div className="todos" role="todos">
      <div className="search-field-div" aria-labelledby="search-field">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          aria-label="search"
          onChange={handleSearchTodo}
        />

        <button
          className="create-button"
          aria-label="todo-create"
          onClick={() => navigate("/create")}
        >
          <AddIcon />
          Create
        </button>
      </div>
      <div className="filter-status" aria-label="filter-todo">
        <p id="filter-todo">Filter by status</p>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            aria-label="select-filter"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
        <div className="delete-multiple">
          <FormControl component="fieldset" variant="standard">
            <FormControlLabel
              control={
                <Checkbox checked={isMuldelcheckboxEnabled} name="gilad" />
              }
              label="Delete Multiple"
              onChange={(e) => setIsMuldelcheckboxEnabled(e.target.checked)}
            />
          </FormControl>
          {isMuldelcheckboxEnabled && (
            <p onClick={handleDeleteMultiple} aria-label="delete-multiple">
              delete
            </p>
          )}
        </div>
      </div>
      {searchedTodos.length === 0 && !isLoading ? (
        <NoData />
      ) : isLoading ? (
        <CircularProgress sx={{ marginTop: "100px" }} />
      ) : (
        <div className="todo-grid" role="todo-listitems">
          {searchedTodos.map((todo, index) => {
            const isMultipleTodoSelected = selectMultipleIds.includes(todo._id);
            return (
              <div
                key={index}
                className={
                  todo.status === "Done"
                    ? "todo-container tododone"
                    : "todo-container"
                }
                aria-label={`todo-list-${index}`}
              >
                <div className="todo-top">
                  <div className="top-with-checkbox">
                    {isMuldelcheckboxEnabled && (
                      <Checkbox
                        {...label}
                        checked={isMultipleTodoSelected}
                        color="success"
                        onChange={() => handleCheckBox(todo._id)}
                      />
                    )}
                    <div
                      className="todo-time-date"
                      aria-labelledby="todo-time-date"
                    >
                      <h3 aria-label="todolist-time">{todo.time}</h3>
                      <p aria-label="todolist-date">{todo.date}</p>
                    </div>
                  </div>
                  <div>
                    <Tooltip title="Edit">
                      <IconButton
                        disabled={isLoading || isMuldelcheckboxEnabled}
                        onClick={() => navigate(`/update/${todo._id}`)}
                        aria-label="edit"
                      >
                        <EditIcon sx={{ color: "blue" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        disabled={isLoading || isMuldelcheckboxEnabled}
                        onClick={() => handleDeleteTodo(todo._id)}
                        aria-label="delete"
                      >
                        <DeleteIcon sx={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <TodoItems index={index} todo={todo} fetchTodos={fetchTodos} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TodosDisplay;
