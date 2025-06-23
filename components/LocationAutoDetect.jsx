import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setStateCode, selectFilters } from "../redux/filtersSlice";

export default function LocationAutoDetect() {
  const dispatch = useDispatch();
  const { city, state } = useSelector(selectFilters);

  useEffect(() => {
    if (city && state) return; // Якщо вже є місто та штат - не робимо запит

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") throw new Error("Permission denied");

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "User-Agent":
                "EasyRent/1.0 (https://github.com/Kate2603/easyrent; contact:kate2603.kv@gmail.com)",
              "Accept-Language": "uk",
            },
          }
        );

        const data = await response.json();
        const cityName =
          data.address.city || data.address.town || data.address.village;
        const stateName = data.address.state;

        if (cityName && stateName) {
          dispatch(setCity(cityName));
          dispatch(setStateCode(stateName));
          return;
        }

        // Фолбек, якщо не знайшли
        dispatch(setCity("New York"));
        dispatch(setStateCode("NY"));
      } catch {
        // У випадку помилки теж фолбек
        dispatch(setCity("New York"));
        dispatch(setStateCode("NY"));
      }
    })();
  }, [city, state, dispatch]);

  return null; // Без UI, без теми
}
