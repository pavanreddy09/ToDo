import { Alert, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_LOGIN_API_URL } from "../../constants";
import { setUserAuthInfo } from "../userAuth";
import axios from "axios";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data } = await axios.post(USER_LOGIN_API_URL, {
        email: email,
        password: password,
      });
      console.log(data);
      setUserAuthInfo(data);
      setIsLoading(false);
      window.location.href = "/";
    } catch (err) {
      setErrorMessage(err.response?.data?.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  return (
    <div className="logincontainer">
      <div className="span">
        <span>Sign In to your account</span>
      </div>
      <div className="formbg">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleLoginUser}>
          <div className="field">
            <label htmlFor="email">
              Email<i>*</i>
            </label>
            <input type="email" name="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">
              Password<i>*</i>
            </label>
            <input type="password" name="password" required />
          </div>
          <div className="field">
            <button disabled={isLoading}>Log In</button>
          </div>
        </form>
        <div>
          <p>
            Don't Have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
