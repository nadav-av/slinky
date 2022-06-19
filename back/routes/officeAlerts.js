const { OfficeAlertsModel, validate } = require("../models/officeAlerts");
const express = require("express");
const router = express.Router();
const authMid = require("../middleware/auth");
const regAuthMid = require("../middleware/registeredAuth");
const adminAuthMid = require("../middleware/adminAuth");
const { lte } = require("lodash");

//get all alerts of an office
router.get("/:officeID", [authMid, regAuthMid], async (request, response) => {
  const alerts = await OfficeAlertsModel.findOne({
    office_id: request.params.officeID,
  });
  if (!alerts) {
    response.status(404).send("office was not found");
    return;
  }
  const resAlerts = alerts.alertsList;
  response.send(resAlerts);
});

/*
//add new office
router.post("/", async (request, response) => {
  const office = new OfficeAlertsModel({
    office_id: request.body,
    alertsList: [],
  });

  await office.save();
});
*/

//post new alert in office
router.post(
  "/:officeID",
  [authMid, regAuthMid, adminAuthMid],

  async (request, response) => {
    const { error } = validate(request.body); //{error} is like result.error
    if (error) {
      response.status(400).send(error.details);
      return;
    }

    let alerts = await OfficeAlertsModel.findOne({
      office_id: request.params.officeID,
    });

    if (!alerts) {
      const office = new OfficeAlertsModel({
        office_id: request.params.officeID,
        alertsList: [],
      });

      await office.save();
      alerts = await OfficeAlertsModel.findOne({
        office_id: request.params.officeID,
      });
      if (!alerts) {
        response.status(500).send("error creating office");
        return;
      }
    }

    alerts.alertsIdCounter = alerts.alertsIdCounter + 1;
    const alert_id = alerts.alertsIdCounter;

    const alertToAdd = {
      id: alert_id,
      content: request.body.content,
      tag: request.body.tag,
      date: Date.now,
    };

    alerts.alertsList.push(alertToAdd);
    await alerts.save();
    response.send(alertToAdd);
  }
);

//update existing alert
router.put(
  "/:officeID/:id",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const alert_id = parseInt(request.params.id);
    const { error } = validate(request.body); //{error} is like result.error
    if (error) {
      response.status(400).send(error.details);
      return;
    }

    const alerts = await OfficeAlertsModel.findOne({
      office_id: request.params.officeID,
    });
    if (!alerts) {
      response.status(404).send("office was not found");
      return;
    }

    const updatedAlert = {
      id: alert_id,
      content: request.body.content,
      tag: request.body.tag,
    };

    let flag = false;
    alerts.alertsList.forEach((alert, index) => {
      if (alert.id == alert_id) {
        alerts.alertsList[index] = updatedAlert;
        flag = true;
      }
    });
    if (!flag) {
      response.status(404).send("alert was not found");
      return;
    }

    alerts.markModified("alertsList");
    await alerts.save();
    response.send(updatedAlert);
  }
);

//deleting an alert
router.delete(
  "/:officeID/:id",
  [authMid, regAuthMid, adminAuthMid],
  async (request, response) => {
    const alert_id = parseInt(request.params.id);
    const alerts = await OfficeAlertsModel.findOne({
      office_id: request.params.officeID,
    });
    if (!alerts) {
      response.status(404).send("office was not found");
      return;
    }

    let flag = false;
    let deleted_alert = {};
    alerts.alertsList.forEach((alert) => {
      if (alert.id == alert_id) {
        deleted_alert = alert;
        alerts.alertsList.splice(alerts.alertsList.indexOf(alert), 1);
        flag = true;
      }
    });
    if (!flag) {
      response.status(404).send("alert was not found");
      return;
    }
    await alerts.save();
    response.send(deleted_alert);
  }
);

module.exports = router;
