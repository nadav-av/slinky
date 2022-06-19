import React, {useRef, useEffect, useState} from "react";
import loginImg from "./login.svg";
import "./style.scss";

const Login = () => {

  // const userRef = useRef();
  // const errRef = useRef();

  // const [user, setUser] = useState('');
  // const [password, setPassword] = useState('');
  // const [errMsg, setErrMsg] = useState('');
  // const [success, setSuccess] = useState(false);

  return (
    <div className="base-container">
      <div className="login-content">
        <div className="login-image">
          <img src={loginImg} alt="login" />
        </div>
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="login-footer">
        <button type="button" className="button-36">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
