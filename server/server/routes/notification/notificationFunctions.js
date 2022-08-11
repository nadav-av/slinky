const NotificationManager = require("../../services/Notification/notificationManager");
const { errorHandler } = require("../Generals/errorHandler");


async function createNotification(req, res) {
  try {

    const { officeId, content, category } = req.body;
    const returnedNotification = await NotificationManager.createNotification(
      officeId,
      content,
      category,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(returnedNotification));
    res.end();
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getAllNotification(req, res) {
  try {
    const listToReturn = await NotificationManager.getAllNotification();
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getAllNotificationOfOfficeId(req, res) {
  try {
    const listToReturn = await NotificationManager.getAllNotificationOfOfficeId(req.params.officeId);
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function deleteNotification(req, res) {
  try {
    const listToReturn = await NotificationManager.deleteNotification(
      req.body.notificationId,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function updateNotification(req, res) {
  try {
    const listToReturn = await NotificationManager.updateNotification(
      req.body.notificationId,
      req.body.content,
      req.tokenData.userName,
      req.body.category
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = {
    createNotification,
    getAllNotification,
    getAllNotificationOfOfficeId,
    deleteNotification,
    updateNotification,
};