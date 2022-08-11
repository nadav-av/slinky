import {
  USER_EXISTS,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
  SERVER_ERROR,
  INVALID_TOKEN,
} from "./Consts";

class UserClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
  }

  async login(userName, password) {
    const response = await fetch(`${this.url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (response.status === 200) {
      const res = await response.json();
      localStorage.setItem("x-auth-token", res.token);
      return res.user;
    } else if (response.status === 401) {
      return INVALID_PASSWORD;
    } else if (response.status === 404) {
      return USER_NOT_FOUND;
    }
  }

  async register(user) {
    const response = await fetch(`${this.url}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        isAdmin: user.isAdmin,
      }),
    });
    if (response.status === 200) {
      const res = await response.json();
      localStorage.setItem("x-auth-token", res.token);
      return res.user;
    } else if (response.status === 400) {
      return USER_EXISTS;
    }
    if (response.status === 500) {
      return SERVER_ERROR;
    }
  }

  async getUser() {
    const response = await fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }
    if (response.status === 400 || response.status === 401) {
      return INVALID_TOKEN;
    }
  }

  async getUserBookings() {
    const response = await fetch(`${this.url}/booking/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }
    if (response.status === 400) {
      return INVALID_TOKEN;
    }
  }
}

export default new UserClient();
