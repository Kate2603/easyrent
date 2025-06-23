import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import SearchScreen from "../screens/SearchScreen";

import { ROUTES } from "../constants/ROUTES";
import { useStrings } from "../hooks/useStrings";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { strings } = useStrings();

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_STACK}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === ROUTES.HOME_STACK) iconName = "home-outline";
          else if (route.name === ROUTES.SEARCH) iconName = "search-outline";
          else if (route.name === ROUTES.PROFILE_TAB)
            iconName = "person-outline";
          else iconName = "ellipse";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name={ROUTES.HOME_STACK}
        component={HomeStack}
        options={{ title: strings.home }}
      />
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{ title: strings.searchApartments }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE_TAB}
        component={ProfileStack}
        options={{ title: strings.profile }}
      />
    </Tab.Navigator>
  );
}
