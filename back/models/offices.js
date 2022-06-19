const Joi = require("joi");
const mongoose = require("mongoose");

const Office_Schema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 25 },
  admin_users: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  ],
  address: { type: String, minlength: 5, maxlength: 25 },
  shared_rooms: [String],
  reg_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const office_model = mongoose.model("offices", Office_Schema);

function validateOffice(alert) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    address: Joi.string().min(5).max(25),
    admin_users: Joi.array().items(Joi.string()).required(),
    shared_rooms: Joi.array().items(Joi.string()),
  });

  return schema.validate(alert);
}

module.exports.OfficeModel = office_model;
module.exports.validate = validateOffice;
