import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import SearchScreen from "../screens/SearchScreen";
import { ROUTES } from "../constants/ROUTES";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_STACK}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === ROUTES.HOME_STACK) iconName = "home-outline";
          else if (route.name === ROUTES.SEARCH) iconName = "search-outline";
          else if (route.name === ROUTES.PROFILE) iconName = "person-outline";
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
        options={{ title: "Головна" }}
      />
      <Tab.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
        options={{ title: "Пошук" }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileStack}
        options={{ title: "Профіль" }}
      />
    </Tab.Navigator>
  );
}
