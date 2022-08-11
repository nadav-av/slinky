const NotificationManagerValidator = require('../notificationManagerValidation');
const notificationManagerValidator = new NotificationManagerValidator();

test('test that check each type paramter,and some validation logic', () => {
    const officeId = 1;
    const content = "Hello, this test is going to be true";
    const madeBy = "ViktorDabush";
    const category = "Some fake category";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(true);
  });

test('test that check officeId when not valid', () => {
    const officeId = "Not a number";
    const content = "Hello, this test is going to be true";
    const madeBy = "ViktorDabush";
    const category = "Some fake category";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(false);
  });

test('test that check content when not valid', () => {
    const officeId = 1;
    const content = "";
    const madeBy = "ViktorDabush";
    const category = "Some fake category";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(false);
  });

test('test that check madeBy when not valid', () => {
    const officeId = 1;
    const content = "Hello, this test is going to be true";
    const madeBy = "                 ";
    const category = "Some fake category";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(false);
  });

test('test that check category when not valid', () => {
    const officeId = 1;
    const content = "Hello, this test is going to be true";
    const madeBy = "ViktorDabush";
    const category = "";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(false);
  });