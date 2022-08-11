const bookingManagerValidator = require('../bookingManagerValidation')
const bookinValidator = new bookingManagerValidator();

test('test that check each type paramter,and some validation logic, start date ', () => {
    expect(bookinValidator.isBookingInformationValid(1,'c1',new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00')))
    .toBe(true);
  });

  test('check the booking place with bad input', () => {
    expect(bookinValidator.isBookingInformationValid(1,1,new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00')))
    .toBe(false);
  });

  test('check the start date is later than the end date', () => {
    expect(bookinValidator.isBookingInformationValid(1,'c1',new Date('December 18, 1995 03:27:00'), new Date('December 18, 1995 03:24:00')))
    .toBe(false);
  });

  test('check not possilbe to book more than 3 days', () => {
    expect(bookinValidator.isBookingInformationValid(1,'c1',new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:25:00')))
    .toBe(false);
  });


  test('test that check if place is not empty string', () => {
    expect(bookinValidator.isBookingPlaceNotValid("c2"))
    .toBe(false);
  });

  test('test that check if place is not empty string', () => {
    expect(bookinValidator.isBookingPlaceNotValid("blabla"))
    .toBe(true);
  });