import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  hasLoaded: false,
  error: null,
  hasSeenOnboarding: false, // для онбордингу
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
      state.user = "guest";
      state.token = null;
    },
  },
});

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

export default userSlice.reducer;

// --- THUNKS ---

export const loadUserProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const jsonValue = await AsyncStorage.getItem("userData");
    const onboardingValue = await AsyncStorage.getItem("hasSeenOnboarding");

    if (jsonValue != null) {
      const { user, token } = JSON.parse(jsonValue);
      dispatch(loginSuccess({ user, token }));
    }

    if (onboardingValue === "true") {
      dispatch(setHasSeenOnboarding(true));
    }
  } catch (e) {
    dispatch(setError("Помилка завантаження профілю"));
    console.error("AsyncStorage load error:", e);
  } finally {
    dispatch(setLoading(false));
    dispatch(setHasLoaded(true));
  }
};

export const markOnboardingSeen = () => async (dispatch) => {
  try {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    dispatch(setHasSeenOnboarding(true));
  } catch (e) {
    console.error("AsyncStorage onboarding error:", e);
  }
};

export const performLogin = (userData) => async (dispatch) => {
  dispatch(loginSuccess(userData));
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  } catch (e) {
    console.error("AsyncStorage login save error:", e);
  }
};

export const performLogout = () => async (dispatch) => {
  dispatch(logout());
  try {
    await AsyncStorage.removeItem("userData");
  } catch (e) {
    console.error("AsyncStorage logout error:", e);
  }
};

export const updateProfile = (updatedFields) => async (dispatch, getState) => {
  dispatch(updateUser(updatedFields));
  try {
    const { user, token } = getState().user;
    await AsyncStorage.setItem("userData", JSON.stringify({ user, token }));
  } catch (e) {
    console.error("AsyncStorage update error:", e);
    dispatch(setError("Не вдалося зберегти зміни"));
  }
};
