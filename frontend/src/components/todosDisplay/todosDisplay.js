import React, { useEffect, useState } from "react";

import TodoItems from "./todoItems";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../../constants";
import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import NoData from "../noData";
import { useNavigate } from "react-router-dom";
import { configAuth, getUserAuthInfo } from "../userAuth";

function TodosDisplay() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedTodos, setSearchedTodos] = useState([]);
  const [filterValue, setFilterValue] = useState("All");
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
    <div className="todos">
      <div className="search-field-div">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          onChange={handleSearchTodo}
        />

        <button className="create-button" onClick={() => navigate("/create")}>
          <AddIcon />
          Create
        </button>
      </div>
      <div className="filter-status">
        <p>Filter by status</p>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </div>
      {searchedTodos.length === 0 && !isLoading ? (
        <NoData />
      ) : isLoading ? (
        <CircularProgress sx={{ marginTop: "100px" }} />
      ) : (
        <div className="todo-grid">
          {searchedTodos.map((todo, index) => {
            return (
              <TodoItems key={index} todo={todo} fetchTodos={fetchTodos} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TodosDisplay;
