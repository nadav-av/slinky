import React, { useState, useEffect } from "react";
import { Dropdown } from "monday-ui-react-core/";
import "monday-ui-react-core/dist/main.css";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./bookingForm.css";
import bookingClient from "../../Services/bookingClient";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { parseToStringHour } from "../Generics/Parses/Parses"
import { useSelector } from "react-redux";

const BookingForm = () => {
  const bookingInfo = useSelector((state) => state.allReducers.booking.bookingInfo)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState(-1);
  const [endHour, setEndHour] = useState(-1);
  const [isStartHour, setIsStartHour] = useState(false);
  const [isEndHour, setIsEndHour] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState([]);
  let navigate = useNavigate();
  const getAvailableHours = async (
    startDate,
    endDate
  ) => {
    try {
      setAvailableHours(
        await bookingClient.getAvailableStartHours(
          bookingInfo.officeId,
          bookingInfo.bookingPlace,
          startDate,
          endDate
        )
      );
    } catch (err) {
      console.error("err");
    }
  };

  useEffect(() => {
    getAvailableHours(startDate, endDate);
  }, [startDate]);

  const calcAvailableEndHours = () => {
    const endHours = [];
    let i = availableHours.indexOf(startDate.getHours());
    while (
      i < availableHours.length - 1 &&
      availableHours[i] + 1 === availableHours[i + 1]
    ) {
      endHours.push(availableHours[i] + 1);
      i++;
    }
    endHours.push(availableHours[i] + 1);
    return endHours;
  };

  useEffect(() => {
    if (isStartHour && startHour !== -1) {
      setIsEndHour(false);
      const a = calcAvailableEndHours();
      setAvailableEndHours(a);
    }
  }, [isStartHour, startHour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStartHour && isEndHour) {
      try {
            await bookingClient.addBooking(
              bookingInfo.officeId,
              bookingInfo.bookingPlace,
              startDate,
              endDate
            )
          
      } catch {
        console.err("err");
      }
      navigate('/mybookings');
      setTimeout(() => {
        confetti();
      }, 500); 
    }
    else { alert("Booking Failed. You must enter start date and end date"); }
  };

  const convertToDropdownComp = (hoursArray) => {
    return hoursArray.map((value) => {
      const obj = {};
      obj.value = value.toString();
      obj.label = parseToStringHour(value);
      return obj;
    });
  };

  const showStartValue = () => {
    if (startHour === -1 || !isStartHour) {
       return null;
    }
    return convertToDropdownComp([startDate.getHours()])[0]
  }

  const showEndValue = () => {
    if (endHour === -1 || !isEndHour) {
       return null;
    }
    return convertToDropdownComp([endDate.getHours()])[0]
  }

  return (
    <div className="bokkingformWrapper">
      <div className="booking-form">
        <div className="booking-form-container">
          <div className="booking-form-header">
            <h1>Book the office</h1>
          </div>
          <div className="booking-form-body">
            <form onSubmit={handleSubmit}>
              <div className="booking-form-options">
              <div className="form-date">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    class="ui-datepicker"
                    label="Date"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(new Date(date));
                      setEndDate(new Date(date));
                      setIsStartHour(false);
                      setIsEndHour(false);
                      setStartHour(-1);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-hours">
                <div className="start-hour">
                  <Dropdown
                    placeholder="Start Hour"
                    className="dropdown-stories-styles_big-spacing"
                    size={Dropdown.size.SMALL}
                    options={convertToDropdownComp(availableHours)}
                    value={showStartValue()}
                    onOptionSelect={(input) => {
                      setIsStartHour(true);
                      setStartHour(input.value);
                      startDate.setHours(input.value);
                      startDate.setMinutes(0);
                      startDate.setSeconds(0);
                    }}
                    onClear={() => {
                      setIsStartHour(false);
                      setIsEndHour(false);
                      setStartHour(-1);
                    }}
                  />
                </div>
              </div>
              <div className="form-hours">
                <div className="end-hour">
                  <Dropdown
                    placeholder="End Hour"
                    className="dropdown-stories-styles_big-spacing"
                    size={Dropdown.size.SMALL}
                    options={convertToDropdownComp(availableEndHours)}
                    value={showEndValue()}
                    onOptionSelect={(input) => {
                      setIsEndHour(true);
                      setEndHour(input.value);
                      endDate.setHours(input.value);
                      endDate.setMinutes(0);
                      endDate.setSeconds(0);
                    }}
                    onClear={() => {
                      setIsEndHour(false);
                      setEndHour(-1);
                    }}
                    disabled={isStartHour ? false : true}
                  />
                </div>
              </div>
              </div>
              <input type="Submit" className="booking-submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
