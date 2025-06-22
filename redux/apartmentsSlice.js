import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRentalListings, fetchApartmentDetails } from "../api/api";

export const fetchApartments = createAsyncThunk(
  "apartments/fetchApartments",
  async (page = 1, { rejectWithValue, getState }) => {
    try {
      const { filters } = getState();
      const filtersWithPage = { ...filters, page };
      const data = await fetchRentalListings(filtersWithPage);
      return { data, page };
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching apartments");
    }
  }
);

export const fetchApartmentById = createAsyncThunk(
  "apartments/fetchApartmentById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await fetchApartmentDetails(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Не вдалося завантажити квартиру"
      );
    }
  }
);

const initialState = {
  list: [],
  loading: false,
  error: null,
  hasMore: true,

  // Додаткові поля для деталей квартири
  selectedApartment: null,
  selectedApartmentLoading: false,
  selectedApartmentError: null,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    resetApartments(state) {
      // Очищуємо лише список квартир, статуси і помилки, але не зачіпаємо selectedApartment
      state.list = [];
      state.loading = false;
      state.error = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.loading = false;
        const newListings = action.payload.data?.listings || [];
        const page = action.payload.page;

        if (page === 1) {
          state.list = newListings;
        } else {
          state.list.push(...newListings);
        }

        state.hasMore = newListings.length >= 10;
      })
      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Не вдалося завантажити список";
      })
      .addCase(fetchApartmentById.pending, (state) => {
        state.selectedApartment = null;
        state.selectedApartmentLoading = true;
        state.selectedApartmentError = null;
      })
      .addCase(fetchApartmentById.fulfilled, (state, action) => {
        state.selectedApartment = action.payload;
        state.selectedApartmentLoading = false;
      })
      .addCase(fetchApartmentById.rejected, (state, action) => {
        state.selectedApartment = null;
        state.selectedApartmentLoading = false;
        state.selectedApartmentError = action.payload;
      });
  },
});

export const { resetApartments } = apartmentsSlice.actions;

export const selectApartments = (state) => state.apartments.list;
export const selectApartmentsLoading = (state) => state.apartments.loading;
export const selectApartmentsHasMore = (state) => state.apartments.hasMore;
export const selectApartmentsError = (state) => state.apartments.error;

export const selectSelectedApartment = (state) =>
  state.apartments.selectedApartment;
export const selectSelectedApartmentLoading = (state) =>
  state.apartments.selectedApartmentLoading;
export const selectSelectedApartmentError = (state) =>
  state.apartments.selectedApartmentError;

export default apartmentsSlice.reducer;
