import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilter: null, // "Ціна", "Тип", "Рейтинг"
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.selectedFilter = action.payload;
    },
    clearFilter(state) {
      state.selectedFilter = null;
    },
  },
});

export const { setFilter, clearFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectSelectedFilter = (state) => state.filters.selectedFilter;
