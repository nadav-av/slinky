const express = require("express");
const users = require("./server/routes/users");
const notifications = require("./server/routes/notification/notification");
const statistics = require("./server/routes/Statistics/statistics");
const booking = require("./server/routes/booking/booking");
const orders = require("./server/routes/FoodOrder/foodOrder");
const logger = require("./server/middleware/logger.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const clarOrders = require("./server/services/clearOrders");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);
app.use("/booking", booking);
app.use("/users", users);
app.use("/notifications", notifications);
app.use("/statistics", statistics);
app.use("/orders", orders);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || "3042";

app.listen(port, () => {
  console.log("Server started on port", port);
});

cron.schedule("0 0 0 * * *", () => {
  clarOrders();
});
