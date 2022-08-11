const BookingManager = require("../../services/booking/bookingManager");
const { errorHandler } = require("../Generals/errorHandler");

async function createBooking(req, res) {
  try {
    const { officeId, bookingPlace, startDate, endDate } = req.body;
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    const returnedBooking = await BookingManager.addBookingOrder(
      officeId,
      bookingPlace,
      newStartDate,
      newEndDate,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(returnedBooking));
    res.end();
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getAllBookings(req, res) {
  try {
    const listToReturn = await BookingManager.getAllBookings();
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getBookingsOfUser(req, res) {
  try {
    const listToReturn = await BookingManager.getBookingsOfUser(
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function deleteBooking(req, res) {
  try {
    const listToReturn = await BookingManager.deleteBooking(
      req.body.bookingId,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function updateBooking(req, res) {
  try {
    const { bookingId, officeId, bookingPlace, startDate, endDate } = req.body;
    const listToReturn = await BookingManager.updateBooking(
      bookingId,
      officeId,
      bookingPlace,
      startDate,
      endDate,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getBookingOfOffice(req, res) {
  try {
    const listToReturn = await BookingManager.getBookingOfOffice(
      req.body.officeId,
      req.body.bookingPlace
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getBookingByDateAndPlace(req, res) {
  try {
    const { officeId, bookingPlace, startDate, endDate } = req.body;
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    const bookedHours = await BookingManager.getBookingByDateAndPlace(
      officeId,
      bookingPlace,
      newStartDate,
      newEndDate
    );
    res.status(200).send(JSON.stringify(bookedHours));
  } catch (error) {
    errorHandler(error, res);
  }
}

async function getBookingByDate(req, res) {
  try {
    const { date } = req.body;
    const newDate = new Date(date);
    const listOfBookings = await BookingManager.getBookingByDate(newDate);
    const bookedHours = listOfBookings.map((bookingOrder) => {
      return {
        officeId: bookingOrder.officeId,
        bookingPlace: bookingOrder.bookingPlace,
        userName: bookingOrder.userName,
        start: bookingOrder.startDate,
        end: bookingOrder.endDate,
      };
    });
    res.status(200).send(JSON.stringify(bookedHours));
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  deleteBooking,
  updateBooking,
  getBookingOfOffice,
  getBookingByDateAndPlace,
  getBookingByDate,
};
