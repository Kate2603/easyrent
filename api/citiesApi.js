import axios from "axios";
import { CITY_AUTOCOMPLETE_API_KEY } from "../config/apiKeys";

const citiesAxios = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": CITY_AUTOCOMPLETE_API_KEY,
  },
});

export async function fetchCitySuggestions(name) {
  try {
    const { data } = await citiesAxios.get("/city", {
      params: { name },
    });
    return data;
  } catch (error) {
    console.error(
      "Error fetching city suggestions:",
      error.response?.data || error.message
    );
    return [];
  }
}
