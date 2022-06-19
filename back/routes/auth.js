const { UserModel } = require("../models/users");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const cp = require("cookie-parser");

router.post("/", async (request, response) => {
  const { error } = authValidate(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await UserModel.findOne({ email: request.body.email });
  if (!user) return response.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    request.body.password,
    user.password
  );
  if (!validPassword) return response.status(400).send("Invalid password");

  const token = user.generateAuthToken();
  responose
    .cookie("x-auth-token", token, { httpOnly: true })
    .send(request.body.username + " is Logged in, cookie shipped");
});

function authValidate(req) {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
