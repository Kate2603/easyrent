import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./apartmentsSlice";
import filtersReducer from "./filtersSlice";
import bookingFormReducer from "./bookingFormSlice";

export const store = configureStore({
  reducer: {
    bookingForm: bookingFormReducer,
    apartments: apartmentsReducer,
    filters: filtersReducer,
  },
});
