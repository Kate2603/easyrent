import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./apartmentsSlice";
import filtersReducer from "./filtersSlice";
import bookingFormReducer from "./bookingFormSlice";
import { persistedUserReducer } from "./userSlice"; // імпорт із userSlice.js

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // redux-persist wrapped reducer
    bookingForm: bookingFormReducer,
    apartments: apartmentsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
