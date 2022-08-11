import { SERVER_ERROR, INVALID_TOKEN } from "./Consts";

class foodOrdersClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
  }

  async getOrders(resturant) {
    const response = await fetch(`${this.url}/orders?restureant=${resturant}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    if (response.status === 200) {
      const orders = await response.json();
      return orders;
    } else if (response.status === 401) {
      return INVALID_TOKEN;
    } else {
      return SERVER_ERROR;
    }
  }

  async addOrder(order) {
    const response = await fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
      body: JSON.stringify(order),
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    } else if (response.status === 401) {
      return INVALID_TOKEN;
    } else if (response.status === 500) {
      return SERVER_ERROR;
    }
  }
}

export default new foodOrdersClient();
