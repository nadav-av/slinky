import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookingInfo :{
      officeId:null,
      bookingPlace:null
    }
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.bookingInfo.officeId = action.payload.officeId;
      state.bookingInfo.bookingPlace = action.payload.bookingPlace;
    },
  },
});

export const { setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
