import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { persistor } from "./store"; // ⚠️ обовʼязково імпортуй

const persistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["user", "token", "hasSeenOnboarding"],
};

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  hasLoaded: false,
  error: null,
  hasSeenOnboarding: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.hasSeenOnboarding = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
    setHasSeenOnboarding: (state, action) => {
      state.hasSeenOnboarding = action.payload;
    },
    setGuestUser: (state) => {
      state.user = { role: "guest" };
      state.token = null;
    },
  },
});

export const persistedUserReducer = persistReducer(
  persistConfig,
  userSlice.reducer
);

export const {
  loginSuccess,
  logout,
  updateUser,
  setLoading,
  setError,
  setHasLoaded,
  setHasSeenOnboarding,
  setGuestUser,
} = userSlice.actions;

// --- THUNKS ---

export const loadUserProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(setHasLoaded(true)); // усе завантажиться через persist
  } catch (e) {
    dispatch(setError("Помилка завантаження профілю"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const markOnboardingSeen = () => async (dispatch) => {
  dispatch(setHasSeenOnboarding(true)); // Persist бере з редьюсера
};

export const performLogin = (userData) => async (dispatch) => {
  dispatch(loginSuccess(userData));
  // Persist автоматично зберігає user + token
};

export const performLogout = () => async (dispatch) => {
  dispatch(logout());
  try {
    await persistor.purge(); // ⚠️ очищає усе, включно з hasSeenOnboarding
  } catch (e) {
    console.error("Persistor purge error:", e);
  }
};

export const updateProfile = (updatedFields) => async (dispatch, getState) => {
  dispatch(updateUser(updatedFields));
  // Persist автоматично оновлює user
};
