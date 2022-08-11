import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "@fullcalendar/daygrid/main.css";
import "./calendarForm.css";
import bookingClient from "../../Services/bookingClient";
import { parseOffices } from "../Generics/Parses/Parses";

const CalendarForm = () => {
  const [bookingsByDate, setBookingsByDate] = useState([]);
  const colorsTable = [];
  const listOfColors = [
    "red",
    "brown",
    "yellow",
    "blue",
    "pink",
    "navy",
    "purple",
    "orange",
    "green",
  ];

  const getDayEvents = async (date) => {
    const dayEvents = await bookingClient.getDayBookings(date);
    setBookingsByDate(dayEvents);
  };

  const parseToFullCalendarView = (array) => {
    return array.map((obj) => {
      const newObj = {};
      newObj.title =
        obj.userName +
        " - " +
        parseOffices(obj.officeId) +
        " - seat " +
        obj.bookingPlace;
      newObj.start = obj.start;
      newObj.end = obj.end;
      newObj.color = getColor(obj.bookingPlace);
      return newObj;
    });
  };

  const getColor = (bookingPlace) => {
    const index = colorsTable.findIndex((val) => {
      return val.bookingPlace === bookingPlace;
    });
    if (index !== -1) {
      return colorsTable[index].color;
    } else {
      if (listOfColors !== undefined) {
        const color = listOfColors.pop();
        colorsTable.push({ bookingPlace: bookingPlace, color: color });
        return color;
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-glass">
        <div className="calendar-form">
          <FullCalendar
            headerToolbar={{
              start: "prev,next",
              center: "title",
              end: "today",
            }}
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            height={"80%"}
            allDaySlot={false}
            events={parseToFullCalendarView(bookingsByDate)}
            datesSet={function () {
              getDayEvents(this.getDate());
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarForm;
