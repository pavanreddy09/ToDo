import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_LOGIN_API_URL } from "../../constants";
import { getUserAuthInfo, setUserAuthInfo } from "../userAuth";
import axios from "axios";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // login user function
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
      setUserAuthInfo(data);
      setIsLoading(false);
      window.location.href = "/";
    } catch (err) {
      setErrorMessage(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // useeffect to hide error after 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 5000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  // useEffect to test if user is already loged in or not if loged in navigate to home
  useEffect(() => {
    const userInfo = getUserAuthInfo();
    if (userInfo) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="logincontainer" role="login-main">
      <div className="span" aria-labelledby="login-title">
        <span id="login-title">Sign In to your account</span>
      </div>
      <div className="formbg" aria-labelledby="error-message">
        {errorMessage && (
          <Alert severity="error" aria-labelledby="error-message">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleLoginUser} role="login-form">
          <div className="field">
            <label htmlFor="email">
              Email<i>*</i>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              aria-label="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">
              Password<i>*</i>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              aria-label="password"
              required
            />
          </div>
          <div className="field">
            <button disabled={isLoading} aria-label="login-button">
              Log In
            </button>
          </div>
        </form>
        <div>
          <p>
            Don't Have an account?{" "}
            <Link to="/register" aria-label="link-to-register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
