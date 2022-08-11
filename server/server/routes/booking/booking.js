const express = require("express");
const auth = require('../../middleware/auth');
const { createBooking, getAllBookings, getBookingsOfUser, deleteBooking, updateBooking, getBookingOfOffice, getBookingByDateAndPlace, getBookingByDate } = require('./bookingFunctions');
const bookingRouter = express.Router();

bookingRouter.post("/", [auth], createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/user", [auth], getBookingsOfUser);
bookingRouter.delete("/", [auth], deleteBooking);
bookingRouter.post("/update", [auth], updateBooking);
bookingRouter.post("/booking-by-bookingPlace", getBookingOfOffice);
bookingRouter.post(
  "/all-booking-by-date-and-place",
  getBookingByDateAndPlace
);
bookingRouter.post("/all-booking-by-date",getBookingByDate);
module.exports = bookingRouter;
