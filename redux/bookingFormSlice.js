import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  date: "",
  guests: "",
  name: "",
  phone: "",
  email: "",
};

const bookingFormSlice = createSlice({
  name: "bookingForm",
  initialState,
  reducers: {
    setBookingData(state, action) {
      return { ...state, ...action.payload };
    },
    resetBookingData() {
      return initialState;
    },
  },
});

export const { setBookingData, resetBookingData } = bookingFormSlice.actions;
export const selectBookingData = (state) => state.bookingForm;
export default bookingFormSlice.reducer;
