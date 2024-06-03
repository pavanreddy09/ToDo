import React, { useEffect, useState } from "react";
import TodoForm from "../todoForm";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import axios from "axios";
import { configAuth, getUserAuthInfo } from "../userAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";

function UpdateTodoForm() {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // fetch todo function
  const fetchTodo = async () => {
    setIsLoading(true);
    const userInfo = getUserAuthInfo();

    if (userInfo) {
      try {
        const { data } = await axios.get(
          `${API_URL}/${id}`,
          configAuth(userInfo)
        );
        console.log(data);
        setFormValues(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      navigate("/login");
    }
  };

  // update a todo function
  const handleTodoUpdate = async (e) => {
    e.preventDefault();
    if (!formValues.title) {
      return alert("Please Enter the Title");
    }
    const userInfo = getUserAuthInfo();
    setIsLoading(true);
    await axios
      .put(
        `${API_URL}/${id}`,
        {
          title: formValues.title,
          description: formValues.description,
          status: formValues.status,
        },
        configAuth(userInfo)
      )
      .then(function (response) {
        alert("Todo is Updated Succesfully!");
        setIsLoading(false);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTodo();
  }, [id]);

  return (
    <div>
      <div className="todoform">
        <div className="span">
          <Tooltip title="Back">
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Tooltip>
          <span>Update a Todo</span>
        </div>
        <TodoForm
          formValues={formValues}
          setFormValues={setFormValues}
          handleOnSubmit={handleTodoUpdate}
          isLoading={isLoading}
          buttonText={"Update"}
        />
      </div>
    </div>
  );
}

export default UpdateTodoForm;
