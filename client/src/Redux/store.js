import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import bookingReducer from "./Slices/bookingSlice";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import officeReducer from "./Slices/officeSlice";

const allReducers = combineReducers({
  user: userReducer,
  booking:bookingReducer,
  office:officeReducer
});

export const store = configureStore({
  reducer: {
    allReducers
  },
  middleware: [thunkMiddleware],
});
