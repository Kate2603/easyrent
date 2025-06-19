import axios from "axios";
import { RENTCAST_API_KEY, RENTCAST_API_URL } from "../config/apiKeys";

// 🔧 Створення екземпляра axios для Rentcast API
const rentcastAxios = axios.create({
  baseURL: RENTCAST_API_URL,
  headers: {
    Accept: "application/json",
    "X-Api-Key": RENTCAST_API_KEY,
  },
});

// ✅ Отримати списки квартир із фільтрами та сортуванням
export async function fetchRentalListings({
  city,
  state,
  limit = 10,
  page = 1,
  filterSort = "formattedAddress",
}) {
  try {
    console.log("📤 Параметри, які відправляються до API:", {
      city,
      state,
      limit,
      page,
      sortBy: filterSort,
    });

    const { data } = await rentcastAxios.get("/properties", {
      params: {
        city,
        state,
        limit,
        page,
        sortBy: filterSort,
      },
    });

    console.log("📥 Відповідь від API:", data);

    return Array.isArray(data) ? { listings: data } : data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    throw error;
  }
}

// ✅ Отримати деталі однієї квартири за ID
export async function fetchApartmentDetails(id) {
  try {
    const { data } = await rentcastAxios.get(`/properties/${id}`);
    return data;
  } catch (error) {
    console.error(
      "❌ Error fetching apartment details:",
      error.response?.data || error.message
    );
    throw error;
  }
}
