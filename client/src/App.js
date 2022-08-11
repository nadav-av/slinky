import React, { useEffect, useState } from "react";
import { INVALID_TOKEN } from "./Services/Consts";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Generics/NavBar/NavBar";
import BookingForm from "./Components/BookingForm/BookingForm";
import NotFound from "./Pages/NotFound/NotFound";
import "./App.css";
import SignUp from "./Pages/SignUp/SignUp";
import VisualMap from "./Pages/visualMap/VisualMap";
import UserBooking from "./Pages/UserBookings/UserBookings";
import HomePage from "./Pages/HomePage/HomePage";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
import userClient from "./Services/userClient";
import FoodOrder from "./Pages/FoodOrder/FoodOrder";
import OfficePage from "./Pages/OfficePage/OfficePage";
import StatisticsPage from "./Pages/StatisticsPage/statistics";
import CalendarForm from "./Components/Calendar/CalendarForm";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setIsLoggedIn } from "./Redux/Slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    userClient.getUser().then((res) => {
      if (res === INVALID_TOKEN) {
        dispatch(setIsLoggedIn(false));
      } else {
        dispatch(setUser(res));
        dispatch(setIsLoggedIn(true));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="App">
        <div className="nav-bar">
          <Navbar />
        </div>
        <div className="contaier">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/visualmap" element={<VisualMap />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/mybookings" element={<UserBooking />} />
            <Route path="/orderfood" element={<FoodOrder />} />
            <Route path="/book" element={<OfficePage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/calendar" element={<CalendarForm />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
