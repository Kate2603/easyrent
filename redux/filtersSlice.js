import { createSlice } from "@reduxjs/toolkit";

// Доступні опції сортування — взяті прямо з API структури
const SORT_OPTIONS = ["formattedAddress", "city", "propertyType"];

const initialState = {
  addressLine1: "",
  formattedAddress: "",
  city: "",
  state: "",
  zipCode: "",
  propertyType: "",
  page: 1,
  filterSort: "formattedAddress", // дефолтне сортування
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Гнучке оновлення одного фільтра
    setFilter(state, action) {
      const { key, value } = action.payload;
      if (key === "filterSort" && !SORT_OPTIONS.includes(value)) {
        console.warn("❌ Невірне значення для filterSort:", value);
        return;
      }
      state[key] = value;
      state.page = 1;
    },

    // Масове оновлення з валідацією
    setFilters(state, action) {
      const allowedKeys = Object.keys(initialState);
      for (const key of allowedKeys) {
        if (key in action.payload) {
          if (
            key === "filterSort" &&
            !SORT_OPTIONS.includes(action.payload[key])
          ) {
            console.warn(
              "❌ Невірне значення filterSort:",
              action.payload[key]
            );
            continue;
          }
          state[key] = action.payload[key];
        }
      }
      state.page = 1;
    },

    // Специфічні оновлення
    setCity(state, action) {
      state.city = action.payload;
      state.page = 1;
    },
    setStateCode(state, action) {
      state.state = action.payload;
      state.page = 1;
    },
    setAddressLine1(state, action) {
      state.addressLine1 = action.payload;
      state.page = 1;
    },
    setZipCode(state, action) {
      state.zipCode = action.payload;
      state.page = 1;
    },
    setPropertyType(state, action) {
      state.propertyType = action.payload;
      state.page = 1;
    },

    // Пагінація
    incrementPage(state) {
      state.page += 1;
    },

    // Новий екшен для скидання лише сторінки
    resetPage(state) {
      state.page = 1;
    },

    // Повне скидання до дефолтного стану
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setFilter,
  setFilters,
  setCity,
  setStateCode,
  setAddressLine1,
  setZipCode,
  setPropertyType,
  incrementPage,
  resetPage,
  resetFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

// Для компонента, що показує опції сортування
export const FILTER_SORT_OPTIONS = SORT_OPTIONS;

export default filtersSlice.reducer;
