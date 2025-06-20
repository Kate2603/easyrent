import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;

      AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("userData");
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
  },
});

export const { loginSuccess, logout, updateUser, setLoading, setError } =
  userSlice.actions;
export default userSlice.reducer;

// --- Thunk для завантаження користувача з AsyncStorage ---
export const loadUserProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const jsonValue = await AsyncStorage.getItem("userData");
    if (jsonValue != null) {
      const { user, token } = JSON.parse(jsonValue);
      dispatch(loginSuccess({ user, token }));
    }
    dispatch(setLoading(false));
  } catch (e) {
    dispatch(setError("Помилка завантаження профілю"));
    dispatch(setLoading(false));
    console.error("Помилка завантаження профілю", e);
  }
};
