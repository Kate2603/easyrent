import * as Location from "expo-location";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity, setStateCode, selectFilters } from "../redux/filtersSlice";

export default function LocationAutoDetect() {
  const dispatch = useDispatch();
  const { city, state } = useSelector(selectFilters);

  useEffect(() => {
    if (city && state) return; // вже встановлено

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") throw new Error("Permission denied");

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
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

        // fallback
        dispatch(setCity("New York"));
        dispatch(setStateCode("NY"));
      } catch (error) {
        // fallback on any error
        dispatch(setCity("New York"));
        dispatch(setStateCode("NY"));
      }
    })();
  }, [city, state]);

  return null;
}
