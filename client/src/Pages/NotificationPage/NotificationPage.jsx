import React from "react";
import Notification from "../../Components/Notifications/Notification";
import "./notificationPage.css";

const NotificationPage = () => {
  return (
    <div className="notification-container">
      <div className="notification-glass">
        <Notification />
      </div>
    </div>
  );
};

export default NotificationPage;
