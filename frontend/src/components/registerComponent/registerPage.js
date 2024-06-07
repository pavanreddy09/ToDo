import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_REGISTER_API_URL } from "../../constants";
import axios from "axios";
import { getUserAuthInfo, setUserAuthInfo } from "../userAuth";
import { Alert } from "@mui/material";
import { genConfig } from "react-nice-avatar";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordValidate, setPasswordValidate] = useState(false);
  const [passwordHasFocus, setPasswordHasFocus] = useState(false);

  // user Register function
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const fname = formData.get("fname");
    const email = formData.get("email");
    const password = formData.get("password");
    const config = genConfig();

    try {
      const { data } = await axios.post(USER_REGISTER_API_URL, {
        email: email,
        password: password,
        fullName: fname,
        avatar: config,
      });

      setUserAuthInfo(data);
      setIsLoading(false);
      window.location.href = "/";
    } catch (err) {
      setErrorMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // validate password function
  const handlePassword = (e) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    const value = e.target.value;
    setPasswordValidate(regex.test(value));
  };

  // useeffect to hide error after 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 9000);
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
    <div className="logincontainer" role="register-main">
      <div className="span" aria-labelledby="register-title">
        <span id="register-title">Create your account</span>
      </div>
      <div className="formbg" aria-labelledby="error-message">
        {errorMessage && (
          <Alert severity="error" id="error-message">
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleRegisterUser} role="register-form">
          <div className="field">
            <label htmlFor="fname">Full Name</label>
            <input type="text" name="fname" id="fname" aria-label="full-name" />
          </div>
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
              onChange={handlePassword}
              onFocus={() => setPasswordHasFocus(true)}
              onBlur={() => setPasswordHasFocus(false)}
            />
          </div>
          {passwordHasFocus && (
            <div className="password-check">
              <p className="password-check-text">
                Minimum 8 characters, at least one uppercase letter, one
                lowercase letter, one number and one special character
              </p>
              {passwordValidate ? (
                <TaskAltIcon
                  sx={{ color: "green", fontSize: "16px", marginLeft: "5px" }}
                />
              ) : (
                <RotateRightIcon
                  sx={{ color: "red", fontSize: "14px", marginLeft: "5px" }}
                  className={!passwordValidate ? "rotate" : ""}
                />
              )}
            </div>
          )}
          <div className="field">
            <button disabled={isLoading} aria-label="register-button">
              Register
            </button>
          </div>
        </form>
        <div>
          <p>
            Have an account?{" "}
            <Link to="/login" aria-label="link-to-login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
