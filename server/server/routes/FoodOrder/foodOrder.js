const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", auth, (req, res) => {
  const restureant = req.query.restureant;
  fs.readFile(path.join(__dirname, "./orders.json"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const orders = JSON.parse(data);
      const resturenatOrders = orders[restureant];
      res.status(200).send(resturenatOrders);
    }
  });
});

router.post("/", auth, (req, res) => {
  fs.readFile(path.join(__dirname, "./orders.json"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const orders = JSON.parse(data);
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const order = req.body.order;
      const office = req.body.office;
      const resturant = req.body.resturant;
      orders[resturant].push({
        firstName: firstName,
        lastName: lastName,
        office: office,
        order: order,
      });
      fs.writeFile(
        path.join(__dirname, "./orders.json"),
        JSON.stringify(orders),
        (err) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(orders[resturant]);
          }
        }
      );
    }
  });
});

module.exports = router;
