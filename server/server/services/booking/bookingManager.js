const BookingManagerValidator = require("./bookingManagerValidation");
const BookingDatabaseManage = require("./bookingDatabaseManage");
const { createError } = require("../General/errorCreator");
const { isNotNumber } = require("../General/generalValidator");

class BookingManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async addBookingOrder(officeId, bookingPlace, startDate, endDate, userName) {
    if (
      this.bookingManagerValidator.isBookingInformationValid(
        officeId,
        bookingPlace,
        startDate,
        endDate
      ) === false
    ) {
      throw createError("parameters are not good", 400);
    }
    const bookOrder = await this.bookingDatabase.addBooking(
      officeId,
      bookingPlace,
      userName,
      startDate,
      endDate
    );
    const bookToReturn = {
      id: bookOrder.id,
      officeId: bookOrder.officeId,
      bookingPlace: bookOrder.bookingPlace,
      startDate: bookOrder.startDate,
      endDate: bookOrder.endDate,
    };
    return bookToReturn;
  }
  async getBookingsOfUser(userName) {
    return await this.bookingDatabase.getBookingsOfUser(userName);
  }
  async getAllBookings() {
    return await this.bookingDatabase.getAllBookings();
  }
  async deleteBooking(bookingId, userName) {
    return await this.bookingDatabase.deleteBooking(bookingId, userName);
  }
  async updateBooking(
    bookingId,
    officeId,
    bookingPlace,
    startDate,
    endDate,
    userName
  ) {
    if (
      this.bookingManagerValidator.isBookingInformationValid(
        officeId,
        bookingPlace,
        startDate,
        endDate
      ) === false ||
      isNotNumber(bookingId) === true
    ) {
      throw createError("parameters are not good", 400);
    }
    await this.bookingDatabase.updateBooking(
      bookingId,
      officeId,
      bookingPlace,
      userName,
      startDate,
      endDate,
      userName
    );
  }
  async getBookingOfOffice(officeId) {
    return await this.bookingDatabase.getAllBookings(officeId);
  }
  async getBookingByDateAndPlace(officeId, bookingPlace, startDate, endDate) {
    const allBookings = await this.bookingDatabase.getBookingByDateAndPlace(
      officeId,
      bookingPlace,
      startDate,
      endDate
    );
    const bookedHours = allBookings.map((bookingOrder) => {
      return {
        startDate: bookingOrder.startDate,
        endDate: bookingOrder.endDate,
      };
    });
    return bookedHours;
  }
  async getBookingByDate(date) {
    return await this.bookingDatabase.getBookingByDate(date);
  }
}

module.exports = new BookingManager();
