import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LoginRequiredWrapper from "../components/LoginRequiredWrapper";

import { ROUTES } from "../constants/ROUTES";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.PROFILE}>
      <Stack.Screen name={ROUTES.PROFILE} options={{ title: "Профіль" }}>
        {() => (
          <LoginRequiredWrapper>
            <ProfileScreen />
          </LoginRequiredWrapper>
        )}
      </Stack.Screen>

      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        options={{ title: "Редагування профілю" }}
      >
        {() => (
          <LoginRequiredWrapper>
            <EditProfileScreen />
          </LoginRequiredWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
