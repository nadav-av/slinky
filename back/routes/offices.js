const { OfficeModel, validate } = require("../models/offices");
const authMid = require("../middleware/auth");
const regAuthMid = require("../middleware/registeredAuth");
const adminAuthMid = require("../middleware/adminAuth");
const express = require("express");
const { OfficeAlertsModel } = require("../models/officeAlerts");
const router = express.Router();
const { UserModel } = require("../models/users");

router.get("/", [authMid], async (request, response) => {
  const offices = await OfficeModel.find();
  response.send(offices);
});

router.get("/officeID", [authMid], async (request, response) => {
  const office = await OfficeModel.findOne({ _id: request.params.officeID });
  if (!office) {
    response.status(404).send("office was not found");
    return;
  }
  response.send(office);
});

router.post("/", [authMid], async (request, response) => {
  const { error } = validate(request.body);
  if (error) {
    response.status(400).send(error.details);
    return;
  }

  const office = new OfficeModel({
    name: request.body.name,
    admin_users: request.body.admin_users,
    address: request.body.address,
    shared_rooms: request.body.shared_rooms,
  });

  office.admin_users.push(request.user);
  office.reg_users.push(request.user);

  const user = await UserModel.findOne({ _id: request.user._id });
  user.reg_offices.push(office);
  user.admin_offices.push(office);
  await user.save();
  await office.save();
  response.header("x-auth-token", updatedToken).send(office);
});

router.put(
  "/:officeID",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const { error } = validate(request.body);
    if (error) {
      response.status(400).send(error.details);
      return;
    }

    const office = await OfficeModel.findOneAndUpdate(
      { _id: request.params.officeID },
      request.body,
      { new: true }
    );
    if (!office) {
      response.status(404).send("office was not found");
      return;
    }
    response.send(office);
  }
);

//add admin to office
router.put(
  "/:officeID/:adminID",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const office = await OfficeModel.findOne({ _id: request.params.officeID });
    if (!office) {
      response.status(404).send("office was not found");
      return;
    }
    office.admin_users.push(request.params.adminID);
    await office.save();
    response.send(office);
  }
);

router.delete(
  "/:OfficeID",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const office = await OfficeModel.findOneAndDelete({
      _id: request.params.OfficeID,
    });
    if (!office) {
      response.status(404).send("office was not found");
      return;
    }
    response.send(office);
  }
);

//delete admin from office
router.delete(
  "/:officeID/:adminID",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const office = await OfficeModel.findOne({ _id: request.params.officeID });
    if (!office) {
      response.status(404).send("office was not found");
      return;
    }
    office.admin_users.pull(request.params.adminID);
    await office.save();
    response.send(office);
  }
);

//add shared room to office
router.post(
  "/:officeID/:sharedRoomName",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const office = await OfficeModel.findOne({ _id: request.params.officeID });
    if (!office) {
      response.status(404).send("office was not found");
      return;
    }
    office.shared_rooms.push(request.params.sharedRoomName);
    await office.save();
    response.send(office);
  }
);

module.exports = router;
