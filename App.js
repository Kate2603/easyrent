import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import RootNavigator from "./navigation/RootNavigator";

import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { loadUserProfile } from "./redux/userSlice";

// Компонент для ініціалізації стору після завантаження
function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <LocaleProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </LocaleProvider>
    </ThemeProvider>
  );
}

// Головний застосунок з Redux Provider
export default function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}
