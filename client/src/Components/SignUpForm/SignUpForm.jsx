import React, { useState } from "react";
import userClient from "../../Services/userClient";
import { USER_EXISTS } from "../../Services/Consts";
import { useNavigate } from "react-router-dom";
import "./signUpForm.css";
import confetti from "canvas-confetti";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "../../Redux/Slices/userSlice";
const emailValidator = require("email-validator");

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  let navigate = useNavigate();

  const firstLetterToUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDataValid = isUserDataValid(
      firstName,
      lastName,
      email,
      password,
      username,
      company
    );
    if (isDataValid) {
      const newUser = {
        firstName: firstLetterToUpperCase(firstName),
        lastName: firstLetterToUpperCase(lastName),
        email: email,
        password: password,
        userName: username,
        company: company,
        isAdmin: true,
      };
      const res = await userClient.register(newUser);
      if (res !== USER_EXISTS) {
        dispatch(setUser(newUser));
        dispatch(setIsLoggedIn(true));
        confetti();
        navigate("/");
      } else {
        alert(res);
      }
    }
  };

  const isUserDataValid = (
    firstName,
    lastName,
    email,
    password,
    username,
    company
  ) => {
    if (firstName.length < 3) {
      alert("First name must be at least 3 characters");
      return false;
    }
    if (lastName.length < 3) {
      alert("Last name must be at least 3 characters");
      return false;
    }
    if (!emailValidator.validate(email)) {
      alert("Email is not valid");
      return false;
    }
    if (password.length < 5) {
      alert("Password must be at least 5 characters");
      return false;
    }
    if (username.length < 5) {
      alert("Username must be at least 5 characters");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="signup-center">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span></span>
          <label>First name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <span></span>
          <label>Last name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label htmlFor="username">Username</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <span></span>
          <label>Company</label>
        </div>
        <input className="signup-submit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUpForm;
