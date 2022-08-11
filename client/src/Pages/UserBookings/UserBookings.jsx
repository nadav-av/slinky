import React from "react";
import "./userBookings.css";
import UserBookingTable from "../../Components/UserBookingTable/UserBookingTable";

const UserBooking = () => {
  return (
    <div className="user-booking-container">
      <div className="user-booking-glass">
        <h1 className="user-bookong-header"> My Bookings </h1>
        <UserBookingTable />
      </div>
    </div>
  );
};

export default UserBooking;
