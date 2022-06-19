const { UserModel, validate } = require("../models/users");
const authMid = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");

//register user to the database
router.post("/", async (request, response) => {
  const { errror } = validate(request.body);
  if (errror) return response.status(400).send(errror.details[0].message);

  let userToAdd = await UserModel.findOne({ email: request.body.email });
  if (userToAdd) return response.status(400).send("User already registered");

  const user = new UserModel({
    username: request.body.username,
    password: request.body.password,
    email: request.body.email,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    reg_offices: request.body.reg_offices,
    admin_offices: request.body.admin_offices,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  response
    .cookie("x-auth-token", token, { httpOnly: true })
    .send(request.body.username + " is Logged in, cookie shipped");
});

router.get("/me", authMid, async (request, response) => {
  const user = await UserModel.findById(request.user._id).select("-password");
  response.send(user);
});

router.get("/get/cookie", authMid, async (request, response) => {
  const token = request.cookies["x-auth-token"];
  const user = jwt.verify(token, config.get("jwtPrivateKey"));
  response.send(token, user);
});

module.exports = router;
