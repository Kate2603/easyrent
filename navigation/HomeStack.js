import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../contexts/ThemeContext";
import { useStrings } from "../hooks/useStrings";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import HeaderRightControls from "../components/HeaderRightControls";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ApartmentListScreen from "../screens/ApartmentListScreen";
import ApartmentDetailsScreen from "../screens/ApartmentDetailsScreen";
import BookingFormScreen from "../screens/BookingFormScreen";
import PaymentScreen from "../screens/PaymentScreen";
import SuccessScreen from "../screens/SuccessScreen";
import FiltersScreen from "../screens/FiltersScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

import { ROUTES } from "../constants/ROUTES";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { theme } = useTheme();
  const { strings } = useStrings();

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#121212",
        },
        headerTitleStyle: {
          color: theme === "light" ? "#000" : "#fff",
        },
        headerTintColor: theme === "light" ? "#006FFD" : "#4CAF50",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ paddingHorizontal: 16 }}
            accessibilityLabel="Відкрити меню"
          >
            <Icon
              name="menu"
              size={24}
              color={theme === "light" ? "#006FFD" : "#4CAF50"}
            />
          </TouchableOpacity>
        ),
        headerRight: () => <HeaderRightControls />,
      })}
    >
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: strings.home }}
      />
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={LoginScreen}
        options={{ title: strings.login }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ title: strings.register }}
      />
      <Stack.Screen
        name={ROUTES.APARTMENT_LIST}
        component={ApartmentListScreen}
        options={{ title: strings.apartmentList }}
      />
      <Stack.Screen
        name="FiltersScreen"
        component={FiltersScreen}
        options={{ title: strings.filters }}
      />
      <Stack.Screen
        name={ROUTES.APARTMENT_DETAILS}
        component={ApartmentDetailsScreen}
        options={{ title: strings.apartmentDetails }}
      />
      <Stack.Screen
        name={ROUTES.BOOKING}
        component={BookingFormScreen}
        options={{ title: strings.booking }}
      />
      <Stack.Screen
        name={ROUTES.PAYMENT}
        component={PaymentScreen}
        options={{ title: strings.payment }}
      />
      <Stack.Screen
        name={ROUTES.SUCCESS}
        component={SuccessScreen}
        options={{ title: strings.success, gestureEnabled: false }}
      />
      <Stack.Screen
        name={ROUTES.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{ title: strings.editProfile }}
      />
    </Stack.Navigator>
  );
}
