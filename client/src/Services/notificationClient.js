import { INVALID_NOTIFICATIONS } from "../Services/Consts";
class notificationClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
  }

  async getNotifications() {
    const response = await fetch(
      `${this.url}/notifications/get-all-notifications`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }
    if (response.status === 400) {
      return INVALID_NOTIFICATIONS;
    }
  }

  async addNotification(officeId, content, category) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(
      `${this.url}/notifications/create-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userJWTToken,
        },
        body: JSON.stringify({
          officeId: officeId,
          content: content,
          category: category,
        }),
      }
    );
    return response.ok;
  }

  async deleteNotification(notificationId) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(`${this.url}/notifications`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userJWTToken,
      },
      body: JSON.stringify({
        notificationId: notificationId,
      }),
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

export default new notificationClient();
