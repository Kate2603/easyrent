import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

import { ROUTES } from "../constants/ROUTES";
import { useStrings } from "../hooks/useStrings";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { strings } = useStrings();

  return (
    <Stack.Navigator initialRouteName={ROUTES.PROFILE}>
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: strings.profile }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: strings.editProfile }}
      />
    </Stack.Navigator>
  );
}
