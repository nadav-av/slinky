const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 25 },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  reg_offices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Office" }],
  admin_offices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Office" }],
});

User_Schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const user_model = mongoose.model("users", User_Schema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(25).required(),
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(3).required().email(),
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    reg_offices: Joi.array().items(Joi.string()),
    admin_offices: Joi.array().items(Joi.string()),
  });

  return schema.validate(user);
}

module.exports.UserModel = user_model;
module.exports.validate = validateUser;
