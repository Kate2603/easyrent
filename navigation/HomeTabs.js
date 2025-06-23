import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useStrings } from "../hooks/useStrings";

import Icon from "react-native-vector-icons/MaterialIcons";
import HeaderRightControls from "../components/HeaderRightControls";

import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import SearchScreen from "../screens/SearchScreen";

import { ROUTES } from "../constants/ROUTES";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { strings } = useStrings();

  const getHeaderLeft = () => (
    <SafeAreaView style={{ paddingLeft: 8 }}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.iconWrapper}
        accessibilityLabel="Відкрити меню"
      >
        <Icon
          name="menu"
          size={24}
          color={theme === "light" ? "#006FFD" : "#4CAF50"}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );

  const getHeaderRight = () => (
    <SafeAreaView style={{ paddingRight: 8 }}>
      <HeaderRightControls />
    </SafeAreaView>
  );

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_STACK}
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#121212",
        },
        headerTitleStyle: {
          color: theme === "light" ? "#000" : "#fff",
        },
        headerTintColor: theme === "light" ? "#006FFD" : "#4CAF50",
        headerLeft: getHeaderLeft,
        headerRight: getHeaderRight,
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

const styles = StyleSheet.create({
  iconWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
