const { User } = require("../storages/models");

class UserManager {
  async getUser(username) {
    return await User.findOne({
      where: {
        userName: username,
      },
    });
  }

  async createUser(
    userName,
    password,
    firstName,
    lastName,
    email,
    company,
    isAdmin
  ) {
    try {
      const user = await User.create({
        userName,
        password,
        firstName,
        lastName,
        email,
        company,
        isAdmin,
      });
      return user;
    } catch (err) {
      return { err: err };
    }
  }

  async updateUser(userName, password, firstName, lastName, email, company) {
    try {
      return await User.update(
        {
          password,
          firstName,
          lastName,
          email,
          company,
        },
        {
          where: {
            userName,
          },
        }
      );
    } catch (err) {
      return { err: err };
    }
  }

  async deleteUser(userName) {
    return await User.destroy({
      where: {
        userName,
      },
    });
  }
}

module.exports = new UserManager();
