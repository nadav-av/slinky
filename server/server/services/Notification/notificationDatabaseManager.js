const { Notification } = require("../../storages/models");
const { createNewErrorFromDatabaseError } = require("../General/errorCreator");

class NotificationDatabaseManage {
  getAllNotification = async (officeId = null) => {

    try {
      let data;
      if(officeId === null){
        data = await Notification.findAll();
      } else {
        data = await Notification.findAll({where:{officeId}});
      }
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  createNotification = async (officeId, content, madeBy, category) => {
    try {
            const notification = await Notification.create({
                officeId,
                madeBy,
                content,
                category
              });
            return notification;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteNotification = async (notificationId, madeBy) => {
    try {
      const del = await Notification.destroy({
        where: { id: notificationId, madeBy },
      });
      return del;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteAllNotification = async () => {
    try {
      return await Notification.truncate();
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  updateNotification = async (
    notificationId, madeBy, content
  ) => {
    try {
      return await Notification.update(
        {bookingPlace, madeBy, content},
        { where: { id: notificationId } }
      );
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
}

module.exports = NotificationDatabaseManage;