import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderRightControls from "../components/HeaderRightControls";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

import { ROUTES } from "../constants/ROUTES";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { theme } = useTheme();
  const { strings } = useStrings();

  // Компонент для headerLeft з SafeArea та padding
  const HeaderLeft = ({ navigation }) => (
    <SafeAreaView edges={["top", "left"]} style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => navigation.getParent()?.openDrawer()}
        style={styles.menuButton}
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

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#121212",
        },
        headerTitleStyle: {
          color: theme === "light" ? "#000" : "#fff",
        },
        headerTintColor: theme === "light" ? "#006FFD" : "#4CAF50",
        headerShown: true,
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRightControls />,
      })}
    >
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

const styles = StyleSheet.create({
  safeArea: {
    // Задаємо padding для безпечної зони зверху і ліворуч
    paddingLeft: 16,
  },
  menuButton: {
    padding: 8,
  },
});
