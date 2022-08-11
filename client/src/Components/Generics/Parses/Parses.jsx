export function parseOffices (officeId) {
    if (officeId === 1) {
        return "Rubinshtein Towers"
    }
    if (officeId === 2) {
        return "Azrieli Square Tower"
    }
}

export function parseToStringHour (data) {
    if (typeof(data) === 'number') {
        return data > 9 ?
         data.toString() + ":00"
        :
        "0" + data.toString() + ":00";
    }
    if (data instanceof Date || data instanceof Object) {
        const parsedDate = new Date(data);
        let hours = parsedDate.getHours();
        let minutes = parsedDate.getMinutes();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${hours}:${minutes}`;
    }
    return '0';
}

export function parseDate (date) {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
  };