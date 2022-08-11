const { isInputBlank, isNotNumber } = require('../General/generalValidator');

class BookingManagerValidator{
    constructor(){}
    isBookingInformationValid(officeId, bookingPlace, startDate, endDate){
        if(isNotNumber(officeId)) return false;
        if(this.isBookingPlaceNotValid(bookingPlace)) return false;
        if(this.isDateTimeNotValid(startDate)) return false;
        if(this.isDateTimeNotValid(endDate)) return false;
        if(this.isStartDateIsNotBeforeEndDate(startDate, endDate)) return false;
        if(this.isDateInRange(startDate, endDate) === false) return false;
        return true;
    }
    isBookingPlaceNotValid(bookingPlace){
        if(isInputBlank(bookingPlace)) return true;
        if(bookingPlace[0] !== "c" && bookingPlace[0] !== "o") return true;
        if(isNotNumber(bookingPlace.slice(1, bookingPlace.length))) return true;
        return false;
    }
    isDateTimeNotValid(date){
        if (!(date instanceof Date) || isNaN(date)) return true;
        return false;
    }
    isDateInRange(startingDate, endingDate){
        const diffTime = Math.abs(endingDate - startingDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if(diffDays > 1 || diffDays <= 0) return false
        return true;
    }
    isStartDateIsNotBeforeEndDate(startDate, endDate){
        return !(startDate < endDate);
    }
}

module.exports = BookingManagerValidator;