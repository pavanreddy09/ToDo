import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_REGISTER_API_URL } from "../../constants";
import axios from "axios";
import { setUserAuthInfo } from "../userAuth";
import { Alert } from "@mui/material";
import { genConfig } from "react-nice-avatar";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage("");
    }, 9000);
    return () => clearInterval(interval);
  }, [errorMessage]);

  return (
    <div className="logincontainer">
      <div className="span">
        <span>Create your account</span>
      </div>
      <div className="formbg">
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleRegisterUser}>
          <div className="field">
            <label htmlFor="fname">Full Name</label>
            <input type="text" name="fname" />
          </div>
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
            <button disabled={isLoading}>Register</button>
          </div>
        </form>
        <div>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
