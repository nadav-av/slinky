import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    OnClose:() => {},
    BookingForm: () => {}
};

export const officeSlice = createSlice({
  name: "office",
  initialState,
  reducers: {
    setOnClose: (state, action) => {
      state.OnClose = action.payload;
    },
    setBookingForm:(state,action) =>{
        state.BookingForm = action.payload;
    }
  },
});

export const { setOnClose, setBookingForm } = officeSlice.actions;

export default officeSlice.reducer;
