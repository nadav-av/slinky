const { Booking } = require("../../storages/models");
const { Op } = require("sequelize");
const { createNewErrorFromDatabaseError } = require("../General/errorCreator");

class BookingDatabaseManage {
  getAllBookings = async (officeId = null) => {
    try {
      let data;
      if (officeId === null) {
        data = await Booking.findAll();
      } else {
        data = await Booking.findAll({ where: { officeId } });
      }
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getBookingsOfUser = async (userName) => {
    try {
      const data = await Booking.findAll({ where: { userName } });
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  addBooking = async (officeId, bookingPlace, userName, startDate, endDate) => {
    try {
      return await Booking.create({
        officeId,
        bookingPlace,
        userName,
        startDate,
        endDate,
      });
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteBooking = async (bookingId, userName) => {
    try {
      const del = await Booking.destroy({
        where: { id: bookingId, userName },
      });
      return del;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteAllBookings = async () => {
    try {
      return await Booking.truncate();
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  updateBooking = async (
    bookingId,
    officeId,
    bookingPlace,
    userName,
    startDate,
    endDate
  ) => {
    try {
      return await Booking.update(
        { officeId, bookingPlace, userName, startDate, endDate },
        { where: { id: bookingId } }
      );
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getBookingByDateAndPlace = async (
    officeId,
    bookingPlace,
    startDate,
    endDate
  ) => {
    try {
      const startDateLimit = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0,
        0
      );
      const endDateLimist = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const bookingByChairAndDate = Booking.findAll({
        where: {
          officeId,
          bookingPlace,
          startDate: { [Op.gt]: startDateLimit },
          endDate: { [Op.lt]: endDateLimist },
        },
      });
      return bookingByChairAndDate;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getBookingByDateAndOfficeId = async (officeId, date) => {
    try {
      const startDateLimit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
      );
      const endDateLimist = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const bookingByDateAndOfficeId = await Booking.findAll({
        where: {
          officeId,
          startDate: { [Op.gt]: startDateLimit },
          endDate: { [Op.lt]: endDateLimist },
        },
      });
      return bookingByDateAndOfficeId;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };

  getBookingByDate = async (date) => {
    try {
      const startDateLimit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
        0
      );
      const endDateLimist = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const bookingByDate = Booking.findAll({
        where: {
          startDate: { [Op.gte]: startDateLimit },
          endDate: { [Op.lt]: endDateLimist },
        },
      });
      return bookingByDate;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
}

module.exports = BookingDatabaseManage;
