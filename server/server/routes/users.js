const auth = require("../middleware/auth");
const express = require("express");
const bcrypt = require("bcryptjs");
const usersManager = require("../services/usersManager");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { userName, password, firstName, lastName, email, company, isAdmin } =
    req.body;
  const user = await usersManager.getUser(userName);
  if (user) {
    res.status(400).send("User already exists");
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const newUser = await usersManager.createUser(
          userName,
          hash,
          firstName,
          lastName,
          email,
          company,
          isAdmin
        );
        if (newUser.err) {
          res.status(500).send(newUser.err);
        }
        const token = jwt.sign(
          {
            userId: newUser.id,
            userName: newUser.userName,
            isAdmin: newUser.isAdmin,
          },
          "jwtPrivateKey",
          { expiresIn: "24h" }
        );
        res.status(200).send({ user: newUser, token: token });
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await usersManager.getUser(userName);
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result) {
        const token = jwt.sign(
          { userId: user.id, userName: user.userName, isAdmin: user.isAdmin },
          "jwtPrivateKey",
          { expiresIn: "24h" }
        );
        res.status(200).send({ user: user, token: token });
      } else {
        res.status(401).send("Invalid password");
      }
    });
  } else {
    res.status(404).send("User not found");
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await usersManager.getUser(req.tokenData.userName);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
