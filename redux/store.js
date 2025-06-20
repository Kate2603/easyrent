import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./apartmentsSlice";
import filtersReducer from "./filtersSlice";
import bookingFormReducer from "./bookingFormSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bookingForm: bookingFormReducer,
    apartments: apartmentsReducer,
    filters: filtersReducer,
  },
});
