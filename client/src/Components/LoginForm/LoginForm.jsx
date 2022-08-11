import React, { useState } from "react";
import "./loginForm.css";
import userClient from "../../Services/userClient";
import { useNavigate } from "react-router-dom";
import { INVALID_PASSWORD, USER_NOT_FOUND } from "../../Services/Consts";
import { useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../../Redux/Slices/userSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginRes, setloginRes] = useState(null);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await userClient.login(username, password);
    if (res !== INVALID_PASSWORD && res !== USER_NOT_FOUND) {
      dispatch(setUser(res));
      dispatch(setIsLoggedIn(true));
      navigate("/");
    } else {
      setloginRes(res);
    }
  };

  return (
    <div className="center login-center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-txt_field">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="login-txt_field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span></span>
          <label>Password</label>
        </div>
        {loginRes && (
          <div className="login-err-msg">
            <h3>{loginRes}</h3>
          </div>
        )}
        <input className="login-submit" type="submit" />
      </form>
      <div></div>
    </div>
  );
};

export default LoginForm;
