import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";
import RootNavigator from "./navigation/RootNavigator";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import GuestBanner from "./components/GuestBanner";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { loadUserProfile } from "./redux/userSlice";

function AppInitializer() {
  const dispatch = useDispatch();
  const { hasLoaded, hasSeenOnboarding, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadUserProfile());
  }, [dispatch]);

  if (!hasLoaded) return <SplashScreen />;

  if (!hasSeenOnboarding) return <OnboardingScreen />;

  return (
    <ThemeProvider>
      <LocaleProvider>
        <NavigationContainer>
          {user === "guest" && <GuestBanner />}
          <RootNavigator />
        </NavigationContainer>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}
