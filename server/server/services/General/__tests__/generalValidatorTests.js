const {isNotNumber, isInputBlank} = require('../generalValidator')

test('check is a string', () => {
    expect(isInputBlank("blabla"))
    .toBe(false);
  });

  test('check is a string', () => {
    expect(isInputBlank(true))
    .toBe(false);
  });

  test('check is a string', () => {
    expect(isInputBlank(2))
    .toBe(false);
  });

  test('check is a string', () => {
    expect(isInputBlank(""))
    .toBe(true);
  });
  test('check is a string', () => {
    expect(isInputBlank(null))
    .toBe(true);
  });


  test('', () => {
    expect(isNotNumber("blabla"))
    .toBe(true);
  });

  test('', () => {
    expect(isNotNumber(null))
    .toBe(true);
  });

  test('', () => {
    expect(isNotNumber(3))
    .toBe(false);
  });