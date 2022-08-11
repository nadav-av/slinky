const BookingDatabaseManage = require("../booking/bookingDatabaseManage");

class StatisticsManager {
  constructor() {
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async mostBookedPlace(officeId) {
    const allBookings = await this.bookingDatabase.getAllBookings(officeId);
    if(allBookings.length === 0){
        return "There is no bookings yet for this office";
    }
    const newAllBookings = this._sortBookingByBookingPlace(allBookings);
    return this._maxAppearanceOfPlace(newAllBookings);
  }

  _sortBookingByBookingPlace(allBookings){
    const newAllBookings = [...allBookings];
    newAllBookings.sort((firstBookedPlace, secondBookedPlace) => {
        const first = firstBookedPlace.bookingPlace;
        const second = secondBookedPlace.bookingPlace;
  
        if (first < second) {
          return -1;
        }
        if (first > second) {
          return 1;
        }
        return 0;
      });
      return newAllBookings;
  }

  _maxAppearanceOfPlace(bookingsArr) {
    if(bookingsArr === undefined || bookingsArr.length === 0){
      return [];
    }
    let counter = 1;
    const bookedPlaceArrWithCounter = [];
    let i;
    for(i = 1; i < bookingsArr.length; i++){
        if(bookingsArr[i].bookingPlace !== bookingsArr[i-1].bookingPlace){
            bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "booked":counter});
            counter = 1;
        } else{
            counter++;
        }
      }
      if(bookingsArr.length >= 2){
        if(bookingsArr[i-1].bookingPlace === bookingsArr[i-2].bookingPlace){
            bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "booked":counter});
        }
      } else{
        bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[0].bookingPlace, "booked":counter});
      }
    return bookedPlaceArrWithCounter;
  }

  async mostBookedOffice() {
    const allBookings = await this.bookingDatabase.getAllBookings();
    if(allBookings.length === 0){
        return "There is no bookings yet for all offices";
    }
    allBookings.sort((first, second) => {
      const first1 = first.officeId;
      const second2 = second.officeId;

      if (first1 > second2) {
        return 1;
      }
      if (first1 < second2) {
        return -1;
      }
      return 0;
    });
    let counter = 1;
    const bookedOfficeIdArrWithCounter = [];
    let i = 1;
    for(i; i < allBookings.length; i++){
        if(allBookings[i].officeId !== allBookings[i-1].officeId){
            bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "booked":counter});
            counter = 1;
        } else{
            counter++;
        }
      }
      if(allBookings.length >= 2){
        if (allBookings[i-1].officeId === allBookings[i-2].officeId) {
            bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "booked":counter});
        }
      } else{
        bookedOfficeIdArrWithCounter.push({"officeId":allBookings[0].officeId, "booked":counter});
      }
    return bookedOfficeIdArrWithCounter;
  }

  async compareTwoDates(officeId, date1, date2){
    let returnedObject = [];
    const allBookingsOfDate1 = await this.bookingDatabase.getBookingByDateAndOfficeId(officeId, date1);
    const allBookingsOfDate2 = await this.bookingDatabase.getBookingByDateAndOfficeId(officeId, date2);
    const newAllBookingsOfDate1 = this._sortBookingByBookingPlace(allBookingsOfDate1);
    const newAllBookingsOfDate2 = this._sortBookingByBookingPlace(allBookingsOfDate2);
    const bookedDate1 = this._maxAppearanceOfPlace(newAllBookingsOfDate1);
    const bookedDate2 = this._maxAppearanceOfPlace(newAllBookingsOfDate2);
    returnedObject = {"firstDate": bookedDate1, "secondDate": bookedDate2};
    return returnedObject;
  }
}

module.exports = new StatisticsManager();
