const { Console } = require("console");
const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

const emptyOrdersForm = { mcdonalds: [], pandaexpress: [], tacobell: [] };

const clearOrders = () => {
  fs.writeFile(
    path.join(__dirname, "../routes/FoodOrder/orders.json"),
    JSON.stringify(emptyOrdersForm),
    (err) => {
      if (err) {
        console.log("problem with clearing orders");
      }
    }
  );
};

module.exports = clearOrders;
