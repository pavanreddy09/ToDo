import React, { useState } from "react";
import TodoForm from "../todoForm";
import { API_URL } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { configAuth, getUserAuthInfo } from "../userAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Tooltip } from "@mui/material";
import { ToastError, ToastSuccess } from "../toastNotification";

function CreateTodoForm() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "Todo",
  });

  const [isLoading, setIsLoading] = useState(false);

  // create todo function
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!formValues.title) {
      return alert("Please Enter the Title");
    }
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      setIsLoading(true);
      await axios
        .post(
          `${API_URL}/create`,
          {
            title: formValues.title,
            description: formValues.description,
            status: formValues.status,
            email: JSON.parse(userInfo).user.email,
          },
          configAuth(userInfo)
        )
        .then(function (response) {
          ToastSuccess("Todo is Created SuccesFully!");
          setIsLoading(false);
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          ToastError(error.response.data.message);
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="todoform">
      <div className="span">
        <Tooltip title="Back">
          <ArrowBackIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </Tooltip>
        <span aria-label="title-create">Create a Todo</span>
      </div>
      <TodoForm
        formValues={formValues}
        setFormValues={setFormValues}
        handleOnSubmit={handleCreateTodo}
        isLoading={isLoading}
        buttonText={"Create"}
      />
    </div>
  );
}

export default CreateTodoForm;
