import React from "react";
import loginImg from "./login.svg";
import "./style.scss";
import axios from 'axios'

const Register = () => {



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
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="login-footer">
        <button type="button" className="button-36">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
