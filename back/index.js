const debug = require("debug")("app:start");
const config = require("config");
const express = require("express");
const officesAlerts = require("./routes/officeAlerts.js");
const offices = require("./routes/offices.js");
const users = require("./routes/users.js");
const auth = require("./routes/auth.js");
var cookies = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/mono-Slinky", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

//middlewear
app.use(express.json());
app.use(cookies()); 

app.use("/api/alerts", officesAlerts);
app.use("/api/offices", offices);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
